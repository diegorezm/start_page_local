package static

import (
	"embed"
)

//go:embed *.css
//go:embed *.js
var Embeded embed.FS
