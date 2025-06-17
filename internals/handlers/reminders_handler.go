package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/diegorezm/start_page/internals/store"
)

type RemindersHandler struct {
	db *store.Queries
}

func NewRemindersHandler(db *store.Queries) *RemindersHandler {
	return &RemindersHandler{db: db}
}

func (h *RemindersHandler) RegisterAll(mux *http.ServeMux) {
	baseURL := "/api/reminders"
	mux.HandleFunc("GET "+baseURL, h.ListReminders)
	mux.HandleFunc("DELETE "+baseURL+"/{id}", h.DeleteReminder)
	mux.HandleFunc("POST "+baseURL, h.CreateReminder)
	mux.HandleFunc("PUT "+baseURL+"/{id}", h.UpdateReminder)
}

func (h *RemindersHandler) ListReminders(w http.ResponseWriter, r *http.Request) {
	date, err := getDateFromParams(r)
	if err != nil {
		sendError(w, http.StatusBadRequest, "Failed to parse the date.")
		return
	}
	reminders, err := h.db.GetRemindersForDate(r.Context(), store.GetRemindersForDateParams{
		Date:   date,
		Date_2: date.AddDate(0, 0, 1),
	})
	if err != nil {
		fmt.Println(err)
		sendError(w, http.StatusInternalServerError, "Failed to list reminders.")
		return
	}

	writeJSON(w, http.StatusOK, reminders)
}

func (h *RemindersHandler) CreateReminder(w http.ResponseWriter, r *http.Request) {
	var req store.CreateReminderParams

	err := readJSON(r, &req)

	if err != nil {
		sendError(w, http.StatusBadRequest, "Failed to decode request body")
		return
	}

	reminder, err := h.db.CreateReminder(r.Context(), req)

	if err != nil {
		fmt.Println(err)
		sendError(w, http.StatusInternalServerError, "Failed to create reminder.")
		return
	}

	writeJSON(w, http.StatusCreated, reminder)
}

func (h *RemindersHandler) UpdateReminder(w http.ResponseWriter, r *http.Request) {
	id, err := idFromPath(r)

	if err != nil {
		sendError(w, http.StatusBadRequest, "Failed to parse the id.")
		return
	}

	var req store.UpdateReminderParams

	err = readJSON(r, &req)

	if err != nil {
		sendError(w, http.StatusBadRequest, "Failed to decode request body")
		return
	}

	req.ID = int64(id)

	reminder, err := h.db.UpdateReminder(r.Context(), req)

	if err != nil {
		fmt.Println(err)
		sendError(w, http.StatusInternalServerError, "Failed to update reminder.")
		return
	}

	writeJSON(w, http.StatusOK, reminder)
}

func (h *RemindersHandler) DeleteReminder(w http.ResponseWriter, r *http.Request) {
	id, err := idFromPath(r)

	if err != nil {
		sendError(w, http.StatusBadRequest, "Failed to parse the id.")
		return
	}

	err = h.db.DeleteReminder(r.Context(), int64(id))

	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to delete reminder.")
		return
	}

	writeJSON(w, http.StatusOK, nil)
}

func getDateFromParams(r *http.Request) (time.Time, error) {
	date := r.URL.Query().Get("date")

	if date == "" {
		return time.Now(), nil
	}

	parsedTime, err := time.Parse(time.RFC3339, date)

	return parsedTime, err
}
