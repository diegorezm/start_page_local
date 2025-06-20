// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0

package store

import (
	"time"
)

type StartPageReminder struct {
	ID        int64     `json:"id"`
	Text      string    `json:"text"`
	Completed bool      `json:"completed"`
	DueDate   time.Time `json:"due_date"`
	CreatedAt time.Time `json:"created_at"`
}

type StartPageSection struct {
	ID       int64  `json:"id"`
	Title    string `json:"title"`
	Position int64  `json:"position"`
}

type StartPageSectionItem struct {
	ID        int64  `json:"id"`
	Title     string `json:"title"`
	Url       string `json:"url"`
	SectionID int64  `json:"section_id"`
}
