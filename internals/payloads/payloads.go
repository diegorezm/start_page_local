package payloads

import "github.com/diegorezm/start_page/internals/store"

type SectionWithItems struct {
	Section store.StartPageSection       `json:"section"`
	Items   []store.StartPageSectionItem `json:"items"`
}
