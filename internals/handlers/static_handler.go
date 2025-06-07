package handlers

import (
	"io/fs"
	"net/http"

	"github.com/diegorezm/start_page/internals/web/static"
)

type StaticHandler struct {
	files fs.FS
}

func NewStaticHandler() *StaticHandler {
	return &StaticHandler{
		files: static.Embeded,
	}
}

func (sh *StaticHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fs := http.FileServer(http.FS(sh.files))
	http.StripPrefix("/static/", fs).ServeHTTP(w, r)
}

func (sh *StaticHandler) RegisterAll(mux *http.ServeMux) {
	mux.HandleFunc("GET /static/", http.HandlerFunc(sh.ServeHTTP))
}
