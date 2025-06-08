package handlers

import (
	"io/fs"
	"net/http"
	"os"

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
	var isDevelopment = os.Getenv("GO_ENV") != "production"

	if isDevelopment {
		sh.files = os.DirFS("internals/web/static")
	}

	fs := http.FileServer(http.FS(sh.files))
	http.StripPrefix("/static/", fs).ServeHTTP(w, r)
}

func (sh *StaticHandler) RegisterAll(mux *http.ServeMux) {
	mux.HandleFunc("GET /static/", http.HandlerFunc(sh.ServeHTTP))
}
