package static

import (
	"embed"
	"io/fs"
	"strings"
)

//go:embed *
var rawEmbeded embed.FS

// FilteredFS wraps the rawEmbeded FS to exclude files starting with "input"
type FilteredFS struct {
	fs.FS
}

func (f FilteredFS) Open(name string) (fs.File, error) {
	if strings.HasPrefix(name, "input") {
		return nil, fs.ErrNotExist // Or another appropriate error
	}
	return f.FS.Open(name)
}

func (f FilteredFS) ReadDir(name string) ([]fs.DirEntry, error) {
	entries, err := fs.ReadDir(f.FS, name)
	if err != nil {
		return nil, err
	}
	filteredEntries := []fs.DirEntry{}
	for _, entry := range entries {
		if !strings.HasPrefix(entry.Name(), "input") {
			filteredEntries = append(filteredEntries, entry)
		}
	}
	return filteredEntries, nil
}

// Embeded is the filtered file system that ignores "input" files
var Embeded = FilteredFS{FS: rawEmbeded}
