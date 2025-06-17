package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	_ "github.com/mattn/go-sqlite3"

	"github.com/diegorezm/start_page/internals/handlers"
	"github.com/diegorezm/start_page/internals/migrations"
	"github.com/diegorezm/start_page/internals/store"
)

const (
	DEFAULT_SQLITE_PATH = ".local/share/start_page/start_page.db"
	DEFAULT_DATE_FORMAT = "02/01/2006"
)

func createDB() (*sql.DB, error) {
	var home string
	if home = os.Getenv("HOME"); home == "" {
		home = os.Getenv("USERPROFILE") // windows
	}

	pathDir := filepath.Join(home, ".local", "share", "start_page")
	// check if the directory exists
	if _, err := os.Stat(pathDir); os.IsNotExist(err) {
		fmt.Println("Creating directory:", pathDir)
		if err := os.MkdirAll(pathDir, 0755); err != nil {
			return nil, fmt.Errorf("failed to create directory: %w", err)
		}

		if _, err := os.Create(filepath.Join(pathDir, "start_page.db")); err != nil {
			return nil, fmt.Errorf("failed to create database: %w", err)
		}
	}

	dbPath := filepath.Join(pathDir, "start_page.db")
	_, err := os.Stat(dbPath)

	// check if the file exists
	if os.IsNotExist(err) {
		fmt.Println("Creating database...")
		if _, err := os.Create(filepath.Join(pathDir, "start_page.db")); err != nil {
			return nil, fmt.Errorf("failed to create database: %w", err)
		}
	}

	db, err := sql.Open("sqlite3", dbPath)

	return db, nil
}

func main() {
	db, err := createDB()

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	shouldMigrate := flag.Bool("migrate", false, "should migrate the database")
	shouldClean := flag.Bool("clean", false, "should migrate the database")

	flag.Parse()

	m := migrations.NewMigrations(db)
	migrations.RegisterAll(m)

	if *shouldClean == true {
		migrateDOWN(m)
		migrateUP(m)
		return
	}

	if *shouldMigrate == true {
		migrateUP(m)
		return
	}

	mux := http.NewServeMux()

	port := flag.Int("port", 5909, "port to listen on")

	flag.Parse()

	s := store.New(db)

	handlers.RegisterAll(mux, s)

	address := fmt.Sprintf(":%d", *port)

	loggedMux := loggingMiddleware(mux)
	corsMux := corsMiddleware(loggedMux)

	server := &http.Server{
		Addr:    address,
		Handler: corsMux,
	}

	fmt.Printf("Serving on http://localhost%s\n", address)

	log.Fatal(server.ListenAndServe())
}

func migrateUP(m *migrations.Migrations) {
	err := m.Up()
	if err != nil {
		log.Fatalf("Error while migrating: %s", err.Error())
	}
}

func migrateDOWN(m *migrations.Migrations) {
	err := m.Down()
	if err != nil {
		log.Fatalf("Error while cleaning the db: %s", err.Error())
	}
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		log.Printf(
			"[%s] %s %s from %s - User-Agent: %s",
			time.Now().Format("2006-01-02 15:04:05"),
			r.Method,
			r.URL.Path,
			r.RemoteAddr,
			r.Header.Get("User-Agent"),
		)
		next.ServeHTTP(w, r)
		log.Printf(
			"Request for %s %s completed in %s",
			r.Method,
			r.URL.Path,
			time.Since(start),
		)
	})
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})

}
