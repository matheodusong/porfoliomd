import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// The production build contains an accessible HTML fallback for search engines,
// AI agents and visitors with JavaScript disabled. React replaces it immediately
// when the interactive portfolio starts.
rootElement.removeAttribute("data-prerendered");
rootElement.replaceChildren();
createRoot(rootElement).render(<App />);
