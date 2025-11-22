import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// AOS (Animate On Scroll)
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS when the app starts
AOS.init({
  duration: 800, // Animation duration (ms)
  once: true,    // Animate only once per scroll
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
