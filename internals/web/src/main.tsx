import "./styles.css"
import '@fontsource/titillium-web/400.css';
import '@fontsource/titillium-web/600.css';
import '@fontsource/titillium-web/700.css';

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";


import { QueryProvider } from "./providers/query-provider";
import { DialogProviders } from "./providers/dialog-providers";

import { App } from "./app";

const elem = document.getElementById("root")!;

if (!elem) {
  throw new Error("Please define a 'root' element.")
}

const app = (
  <StrictMode>
    <QueryProvider>
      <App />
      <DialogProviders />
    </QueryProvider>
  </StrictMode>
);

createRoot(elem).render(app);

