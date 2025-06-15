package handlers

import (
	"net/http"

	"github.com/diegorezm/start_page/internals/store"
)

type SectionItemHandler struct {
	db *store.Queries
}

func NewSectionItemHandler(db *store.Queries) *SectionItemHandler {
	return &SectionItemHandler{db: db}
}

func (h *SectionItemHandler) RegisterAll(mux *http.ServeMux) {
	basePath := "/api/section_items"

	mux.HandleFunc("POST "+basePath, h.CreateSectionItem)
	mux.HandleFunc("PUT "+basePath+"/{id}", h.UpdateSectionItem)
	mux.HandleFunc("GET "+basePath+"/section/{id}", h.ListSectionItemBySection)
	mux.HandleFunc("GET "+basePath+"/{id}", h.GetSectionItem)
	mux.HandleFunc("DELETE "+basePath+"/{id}", h.DeleteSectionItem)
}

func (h *SectionItemHandler) CreateSectionItem(w http.ResponseWriter, r *http.Request) {
	var req store.CreateSectionItemParams
	err := readJSON(r, &req)

	if err != nil {
		sendError(w, http.StatusBadRequest, "Failed to decode request body")
		return
	}

	sectionItem, err := h.db.CreateSectionItem(r.Context(), req)
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to create section item")
		return
	}

	writeJSON(w, http.StatusCreated, sectionItem)
}

func (h *SectionItemHandler) UpdateSectionItem(w http.ResponseWriter, r *http.Request) {
	id, err := idFromPath(r)
	if err != nil {
		sendError(w, http.StatusBadRequest, err.Error())
		return
	}

	var req store.UpdateSectionItemParams
	err = readJSON(r, &req)

	if err != nil {
		sendError(w, http.StatusBadRequest, "Failed to decode request body")
		return
	}

	req.ID = int64(id)

	sectionItem, err := h.db.UpdateSectionItem(r.Context(), req)
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to update section item")
		return
	}

	writeJSON(w, http.StatusOK, sectionItem)
}

func (h *SectionItemHandler) GetSectionItem(w http.ResponseWriter, r *http.Request) {
	id, err := idFromPath(r)
	if err != nil {
		sendError(w, http.StatusBadRequest, err.Error())
		return
	}

	sectionItem, err := h.db.GetSectionItem(r.Context(), int64(id))
	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to get section item")
		return
	}

	writeJSON(w, http.StatusOK, sectionItem)
}

func (h *SectionItemHandler) ListSectionItemBySection(w http.ResponseWriter, r *http.Request) {
	sectionId, err := idFromPath(r)

	if err != nil {
		sendError(w, http.StatusBadRequest, err.Error())
		return
	}

	sectionItems, err := h.db.ListSectionItemsBySection(r.Context(), int64(sectionId))

	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to list section items")
		return
	}

	writeJSON(w, http.StatusOK, sectionItems)
}

func (h *SectionItemHandler) DeleteSectionItem(w http.ResponseWriter, r *http.Request) {
	sectionId, err := idFromPath(r)

	if err != nil {
		sendError(w, http.StatusBadRequest, err.Error())
		return
	}

	err = h.db.DeleteSectionItem(r.Context(), int64(sectionId))

	if err != nil {
		sendError(w, http.StatusInternalServerError, "Failed to delete section item")
		return
	}

	writeJSON(w, http.StatusOK, nil)
}
