package handlers

import "net/http"

func RegisterAll(mux *http.ServeMux) {
	staticHandler := NewStaticHandler()
	staticHandler.RegisterAll(mux)

	pagesHandler := NewPagesHandler()
	pagesHandler.RegisterAll(mux)
}
