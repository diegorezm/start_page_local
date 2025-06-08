package handlers

import (
	"net/http"

	"github.com/a-h/templ"
	"github.com/diegorezm/start_page/internals/web/views/pages"
)

type PagesHandler struct {
}

func NewPagesHandler() *PagesHandler {
	return &PagesHandler{}
}

func (p *PagesHandler) RegisterAll(mux *http.ServeMux) {
	mux.Handle("GET /", templ.Handler(pages.IndexPage()))
}
