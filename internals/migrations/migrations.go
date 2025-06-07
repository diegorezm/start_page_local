package migrations

import (
	"database/sql"
	"fmt"
	"log"
)

type Migration struct {
	ID   int
	Name string
	Up   func(db *sql.DB) error
	Down func(db *sql.DB) error
}

type Migrations struct {
	db         *sql.DB
	migrations []Migration
}

func NewMigrations(db *sql.DB) *Migrations {
	return &Migrations{
		db:         db,
		migrations: make([]Migration, 0),
	}
}

func (m *Migrations) Register(migration Migration) {
	m.migrations = append(m.migrations, migration)
}

func (m *Migrations) ensureMigrationsTable() error {
	_, err := m.db.Exec(`
		CREATE TABLE IF NOT EXISTS schema_migrations (
			id INTEGER PRIMARY KEY,
			name TEXT NOT NULL,
			applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)
	return err
}

func (m *Migrations) getAppliedMigrations() (map[int]bool, error) {
	rows, err := m.db.Query("SELECT id FROM schema_migrations")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	applied := make(map[int]bool)
	for rows.Next() {
		var id int
		if err := rows.Scan(&id); err != nil {
			return nil, err
		}
		applied[id] = true
	}
	return applied, nil
}

func (m *Migrations) Up() error {
	if err := m.ensureMigrationsTable(); err != nil {
		return err
	}

	applied, err := m.getAppliedMigrations()
	if err != nil {
		return err
	}

	for _, migration := range m.migrations {
		if !applied[migration.ID] {
			log.Printf("Applying migration %d: %s", migration.ID, migration.Name)
			if err := migration.Up(m.db); err != nil {
				return fmt.Errorf("migration %d failed: %w", migration.ID, err)
			}
			_, err := m.db.Exec("INSERT INTO schema_migrations (id, name) VALUES (?, ?)", migration.ID, migration.Name)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func (m *Migrations) Down() error {
	for _, mi := range m.migrations {
		if err := mi.Down(m.db); err != nil {
			return fmt.Errorf("failed to revert migration %d: %w", mi.ID, err)
		}
		_, err := m.db.Exec("DELETE FROM schema_migrations WHERE id = ?", mi.ID)
		if err != nil {
			return fmt.Errorf("failed to delete migration record %d: %w", mi.ID, err)
		}
	}
	return nil
}
