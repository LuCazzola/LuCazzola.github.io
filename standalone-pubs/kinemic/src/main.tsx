/**
 * main.tsx  —  entry point
 *
 * This file wires publication.ts + content.md into the page renderer.
 * You normally do NOT need to edit this file.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import PublicationPage from "@/_internal/PublicationPage";
import publication from "./publication";
import "@/_internal/index.css";

// Load content.md as a raw string and inject it into the publication object
import content from "./content.md?raw";
publication.content = content;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PublicationPage pub={publication} />
  </React.StrictMode>
);
