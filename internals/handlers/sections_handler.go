package handlers

import (
	"context"
	"log"
	"net/http"

	"github.com/diegorezm/start_page/internals/payloads"
	"github.com/diegorezm/start_page/internals/store"
)

type SectionHandler struct {
	db *store.Queries
}

func NewSectionHandler(db *store.Queries) *SectionHandler {
	return &SectionHandler{db: db}
}

func (h *SectionHandler) RegisterAll(mux *http.ServeMux) {
	basePath := "/api/sections"

	mux.HandleFunc("POST "+basePath, h.CreateSection)
	mux.HandleFunc("GET "+basePath, h.ListSections)
	mux.HandleFunc("GET "+basePath+"/{id}", h.GetSection)
	mux.HandleFunc("PUT "+basePath+"/{id}", h.UpdateSection)
	mux.HandleFunc("DELETE "+basePath+"/{id}", h.DeleteSection)
}

func (h *SectionHandler) CreateSection(w http.ResponseWriter, r *http.Request) {
	var req store.CreateSectionParams

	if err := readJSON(r, &req); err != nil {
		sendError(w, http.StatusBadRequest, "Invalid request payload")
		log.Printf("CreateSection: Invalid payload: %v", err)
		return
	}

	section, err := h.db.CreateSection(context.Background(), req)
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to create section")
		log.Printf("CreateSection: DB error: %v", err)
		return
	}

	writeJSON(w, http.StatusCreated, section)
}

func (h *SectionHandler) GetSection(w http.ResponseWriter, r *http.Request) {
	id, err := idFromPath(r)
	if err != nil {
		sendError(w, http.StatusBadRequest, err.Error())
		return
	}

	section, err := h.db.GetSection(context.Background(), int64(id))
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to retrieve section")
		log.Printf("GetSection: DB error: %v", err)
		return
	}

	writeJSON(w, http.StatusOK, section)
}

func (h *SectionHandler) ListSections(w http.ResponseWriter, r *http.Request) {
	includeItems := r.URL.Query().Get("include_items") == "true"

	sections, err := h.db.ListSections(context.Background())

	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to list sections")
		log.Printf("ListSections: DB error: %v", err)
		return
	}

	if includeItems {
		sectionsWithItems := make([]payloads.SectionWithItems, len(sections))

		for i, section := range sections {
			items, err := h.db.ListSectionItemsBySection(context.Background(), section.ID)

			if err != nil {
				sendError(w, http.StatusInternalServerError, "Failed to list items for section")
				log.Printf("ListSections: DB error when listing items: %v", err)
				return
			}

			if items == nil {
				items = []store.StartPageSectionItem{}
			}

			sectionsWithItems[i] = payloads.SectionWithItems{
				Section: section,
				Items:   items,
			}
		}
		writeJSON(w, http.StatusOK, sectionsWithItems)
		return
	}

	writeJSON(w, http.StatusOK, sections)
}

func (h *SectionHandler) UpdateSection(w http.ResponseWriter, r *http.Request) {
	id, err := idFromPath(r)
	if err != nil {
		sendError(w, http.StatusBadRequest, err.Error())
		return
	}

	var req store.UpdateSectionParams // sqlc generates this type
	if err := readJSON(r, &req); err != nil {
		sendError(w, http.StatusBadRequest, "Invalid request payload")
		log.Printf("UpdateSection: Invalid payload: %v", err)
		return
	}

	req.ID = int64(id)

	section, err := h.db.UpdateSection(context.Background(), req)
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to update section")
		log.Printf("UpdateSection: DB error: %v", err)
		return
	}

	writeJSON(w, http.StatusOK, section)
}

func (h *SectionHandler) DeleteSection(w http.ResponseWriter, r *http.Request) {
	id, err := idFromPath(r)
	if err != nil {
		sendError(w, http.StatusBadRequest, err.Error())
		return
	}

	err = h.db.DeleteSection(context.Background(), int64(id))
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to delete section")
		log.Printf("DeleteSection: DB error: %v", err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
