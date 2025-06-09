package handlers

import (
	"context"
	"log"
	"net/http"

	"github.com/diegorezm/start_page/internals/payloads"
	"github.com/diegorezm/start_page/internals/store"
	"github.com/diegorezm/start_page/internals/web/views/pages"
)

type PagesHandler struct {
	db *store.Queries
}

func NewPagesHandler(db *store.Queries) *PagesHandler {
	return &PagesHandler{db: db}
}

func (h *PagesHandler) IndexPage(w http.ResponseWriter, r *http.Request) {
	sections, err := h.db.ListSections(context.Background())

	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to list sections")
		log.Printf("ListSections: DB error: %v", err)
		return
	}

	sectionsWithItems := make([]payloads.SectionWithItems, len(sections))

	for i, section := range sections {
		items, err := h.db.ListSectionItemsBySection(context.Background(), section.ID)
		if err != nil {
			sendError(w, http.StatusInternalServerError, "Failed to list items for section")
			log.Printf("ListSections: DB error when listing items: %v", err)
			return
		}

		sectionsWithItems[i] = payloads.SectionWithItems{
			Section: section,
			Items:   items,
		}
	}

	w.Header().Set("Content-Type", "text/html")
	pages.IndexPage(sectionsWithItems).Render(r.Context(), w)
}

func (h *PagesHandler) RegisterAll(mux *http.ServeMux) {
	mux.HandleFunc("GET /", h.IndexPage)
}
