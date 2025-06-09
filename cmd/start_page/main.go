package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

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

	port := flag.Int("port", 8080, "port to listen on")

	flag.Parse()

	s := store.New(db)

	handlers.RegisterAll(mux, s)

	address := fmt.Sprintf(":%d", *port)

	server := &http.Server{
		Addr:    address,
		Handler: mux,
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
