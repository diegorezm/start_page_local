package handlers

import (
	"net/http"

	"github.com/diegorezm/start_page/internals/store"
)

func RegisterAll(mux *http.ServeMux, s *store.Queries) {
	staticHandler := NewStaticHandler()
	staticHandler.RegisterAll(mux)

	pagesHandler := NewPagesHandler(s)
	pagesHandler.RegisterAll(mux)
}
