import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./routes/Router.tsx";
import { RouterProvider } from "react-router";
import firebaseConfig from "./Firebase/Firebase.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <RouterProvider router={routes}/>
  </StrictMode>
);
