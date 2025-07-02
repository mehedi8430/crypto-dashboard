import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./routes/Router.tsx";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
    <Toaster position="top-center" />
  </StrictMode>
);
