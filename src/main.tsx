import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

requestAnimationFrame(() => {
  const loader = document.getElementById("initial-loader");
  if (loader) {
    loader.classList.add("loaded");
    setTimeout(() => loader.remove(), 300);
  }
});

