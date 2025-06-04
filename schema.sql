CREATE TABLE start_page_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title varchar(255) NOT NULL,
  position INTEGER NOT NULL
);

CREATE TABLE start_page_section_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title varchar(255) NOT NULL,
  url varchar(1024) NOT NULL,
  section_id INTEGER NOT NULL,
  FOREIGN KEY(section_id) REFERENCES start_page_sections(id)
);

CREATE TABLE start_page_reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text varchar(2048) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
