package handlers

import (
	"io/fs"
	"net/http"

	"github.com/diegorezm/start_page/internals/web"
)

type PagesHandler struct {
}

func NewPagesHandler() *PagesHandler {
	return &PagesHandler{}
}

func (p *PagesHandler) RegisterAll(mux *http.ServeMux) {
	assets, err := fs.Sub(web.Dist, "dist")

	if err != nil {
		panic(err)
	}

	fs := http.FileServer(http.FS(assets))
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		http.StripPrefix("/", fs).ServeHTTP(w, r)
	})
}
