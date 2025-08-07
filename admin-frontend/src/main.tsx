import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>
);
