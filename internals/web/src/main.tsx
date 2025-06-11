import "./styles.css";

import React from "react"
import { App } from "./app.tsx";

import { createRoot } from "react-dom/client";


document.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
});
