import { build } from "bun"

build({
  entrypoints: ["./internals/web/static/js/input.js"],
  outdir: "./internals/web/static/js/",
  naming: "output.[ext]",
  minify: true,
  splitting: false,
  format: "esm",
  target: "browser",
})
