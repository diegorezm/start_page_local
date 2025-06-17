package handlers

import (
	"net/http"

	"github.com/diegorezm/start_page/internals/store"
)

func RegisterAll(mux *http.ServeMux, s *store.Queries) {
	sectionsHandler := NewSectionHandler(s)
	sectionsHandler.RegisterAll(mux)

	sectionItemsHandler := NewSectionItemHandler(s)
	sectionItemsHandler.RegisterAll(mux)

	remindersHandler := NewRemindersHandler(s)
	remindersHandler.RegisterAll(mux)

	pagesHandler := NewPagesHandler()
	pagesHandler.RegisterAll(mux)
}
