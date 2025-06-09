package handlers

import (
	"io/fs"
	"net/http"
	"os"

	"github.com/diegorezm/start_page/internals/web/static"
)

type StaticHandler struct {
	devFS  fs.FS
	prodFS fs.FS
}

func NewStaticHandler() *StaticHandler {
	subFS, err := fs.Sub(static.Embeded, "internals/web/static")
	if err != nil {
		panic("failed to create sub FS: " + err.Error())
	}

	return &StaticHandler{
		devFS:  os.DirFS("internals/web/static"),
		prodFS: subFS,
	}
}

func (sh *StaticHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var useDev = os.Getenv("GO_ENV") != "production"

	var sourceFS fs.FS
	if useDev {
		sourceFS = sh.devFS
	} else {
		sourceFS = sh.prodFS
	}

	http.StripPrefix("/static/", http.FileServer(http.FS(sourceFS))).ServeHTTP(w, r)
}

func (sh *StaticHandler) RegisterAll(mux *http.ServeMux) {
	mux.HandleFunc("GET /static/", http.HandlerFunc(sh.ServeHTTP))
}
