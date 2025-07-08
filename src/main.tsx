import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import Providers from "./provider/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers />
    <Toaster position="top-center" />
  </StrictMode>
);
