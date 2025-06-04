-- name: CreateSection :one
INSERT INTO start_page_sections (title, position)
VALUES (?, ?)
RETURNING *;

-- name: GetSection :one
SELECT * FROM start_page_sections
WHERE id = ? LIMIT 1;

-- name: ListSections :many
SELECT * FROM start_page_sections
ORDER BY position;

-- name: UpdateSection :one
UPDATE start_page_sections
SET title = ?, position = ?
WHERE id = ?
RETURNING *;

-- name: DeleteSection :exec
DELETE FROM start_page_sections
WHERE id = ?;

---

-- name: CreateSectionItem :one
INSERT INTO start_page_section_items (title, url, section_id)
VALUES (?, ?, ?)
RETURNING *;

-- name: GetSectionItem :one
SELECT * FROM start_page_section_items
WHERE id = ? LIMIT 1;

-- name: ListSectionItemsBySection :many
SELECT * FROM start_page_section_items
WHERE section_id = ?
ORDER BY title;

-- name: UpdateSectionItem :one
UPDATE start_page_section_items
SET title = ?, url = ?, section_id = ?
WHERE id = ?
RETURNING *;

-- name: DeleteSectionItem :exec
DELETE FROM start_page_section_items
WHERE id = ?;

---

-- name: CreateReminder :one
INSERT INTO start_page_reminders (text)
VALUES (?)
RETURNING *;

-- name: GetReminder :one
SELECT * FROM start_page_reminders
WHERE id = ? LIMIT 1;

-- name: ListReminders :many
SELECT * FROM start_page_reminders
ORDER BY created_at DESC;

-- name: UpdateReminder :one
UPDATE start_page_reminders
SET text = ?, completed = ?
WHERE id = ?
RETURNING *;

-- name: DeleteReminder :exec
DELETE FROM start_page_reminders
WHERE id = ?;

-- name: GetTodaysReminders :many
SELECT * FROM start_page_reminders
WHERE created_at >= date('now', 'start of day') AND created_at < date('now', 'start of day', '+1 day')
ORDER BY created_at DESC;

-- name: GetRemindersForDate :many
SELECT * FROM start_page_reminders
WHERE created_at >= date(?) AND created_at < date(?, '+1 day')
ORDER BY created_at DESC;

-- name: GetRemindersBetweenDates :many
SELECT * FROM start_page_reminders
WHERE created_at >= date(?) AND created_at <= date(?, '+1 day', '-1 second')
ORDER BY created_at DESC;
