package handlers

import (
	"net/http"

	"github.com/diegorezm/start_page/internals/store"
)

type RemindersHandler struct {
	db *store.Queries
}

func NewRemindersHandler(db *store.Queries) *RemindersHandler {
	return &RemindersHandler{db: db}
}

// TODO:
func (h *RemindersHandler) RegisterAll(mux *http.ServeMux) {
}
