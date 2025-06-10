package handlers

import (
	"net/http"

	"github.com/diegorezm/start_page/internals/store"
)

func RegisterAll(mux *http.ServeMux, s *store.Queries) {
	pagesHandler := NewPagesHandler(s)
	pagesHandler.RegisterAll(mux)

	sectionsHandler := NewSectionHandler(s)
	sectionsHandler.RegisterAll(mux)
}
