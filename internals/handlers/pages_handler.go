package handlers

import (
	"net/http"

	"github.com/diegorezm/start_page/internals/web/views/pages"
)

type PagesHandler struct {
}

func NewPagesHandler() *PagesHandler {
	return &PagesHandler{}
}

func (p *PagesHandler) Home(w http.ResponseWriter, r *http.Request) {
	indexPage := pages.IndexPage()
	indexPage.Render(r.Context(), w)
}

func (p *PagesHandler) RegisterAll(mux *http.ServeMux) {
	mux.Handle("GET /", http.HandlerFunc(p.Home))
}
