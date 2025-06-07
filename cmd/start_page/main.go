package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/diegorezm/start_page/internals/migrations"
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

		if _, err := os.Create(filepath.Join(pathDir, "reminder.db")); err != nil {
			return nil, fmt.Errorf("failed to create database: %w", err)
		}
	}

	dbPath := filepath.Join(pathDir, "reminder.db")
	_, err := os.Stat(dbPath)

	// check if the file exists
	if os.IsNotExist(err) {
		fmt.Println("Creating database...")
		if _, err := os.Create(filepath.Join(pathDir, "reminder.db")); err != nil {
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

	m := migrations.NewMigrations(db)

	shouldMigrate := flag.Bool("migrate", false, "should migrate the database")

	if *shouldMigrate == true {
		migrations.RegisterAll(m)
	}

	mux := http.NewServeMux()

	port := flag.Int("port", 8080, "port to listen on")

	flag.Parse()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, world!"))
	})

	address := fmt.Sprintf(":%d", *port)

	server := &http.Server{
		Addr:    address,
		Handler: mux,
	}

	fmt.Printf("Serving on http://localhost%s\n", address)

	log.Fatal(server.ListenAndServe())
}
