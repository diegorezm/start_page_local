import { build } from "bun"

build({
  entrypoints: ["./internals/web/public/index.js"],
  outdir: "./internals/web/static/",
  naming: "main.[ext]",
  minify: true,
  splitting: false,
  format: "esm",
  target: "browser",
})
