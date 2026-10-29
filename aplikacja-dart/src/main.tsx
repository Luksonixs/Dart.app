import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Zmieniamy import, aby wskazywał na Twój plik Demo.tsx
import Demo from "./views/Demo/Demo";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Uruchamiamy komponent Demo zamiast App */}
    <Demo />
  </StrictMode>,
);
