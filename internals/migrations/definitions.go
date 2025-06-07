package migrations

import "database/sql"

func RegisterAll(m *Migrations) {
	m.Register(Migration{
		ID:   1,
		Name: "create_start_page_sections_table",
		Up: func(db *sql.DB) error {
			_, err := db.Exec(`
				CREATE TABLE start_page_sections (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					title VARCHAR(255) NOT NULL,
					position INTEGER NOT NULL
				)
			`)
			return err
		},
		Down: func(db *sql.DB) error {
			_, err := db.Exec(`DROP TABLE IF EXISTS start_page_sections`)
			return err
		},
	})

	m.Register(Migration{
		ID:   2,
		Name: "create_start_page_section_items_table",
		Up: func(db *sql.DB) error {
			_, err := db.Exec(`
				CREATE TABLE start_page_section_items (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					title VARCHAR(255) NOT NULL,
					url VARCHAR(1024) NOT NULL,
					section_id INTEGER NOT NULL,
					FOREIGN KEY(section_id) REFERENCES start_page_sections(id)
				)
			`)
			return err
		},
		Down: func(db *sql.DB) error {
			_, err := db.Exec(`DROP TABLE IF EXISTS start_page_section_items`)
			return err
		},
	})

	m.Register(Migration{
		ID:   3,
		Name: "create_start_page_reminders_table",
		Up: func(db *sql.DB) error {
			_, err := db.Exec(`
				CREATE TABLE start_page_reminders (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					text VARCHAR(2048) NOT NULL,
					completed BOOLEAN NOT NULL DEFAULT 0,
					created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
				)
			`)
			return err
		},
		Down: func(db *sql.DB) error {
			_, err := db.Exec(`DROP TABLE IF EXISTS start_page_reminders`)
			return err
		},
	})
}
