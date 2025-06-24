import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <div>Error occurred</div>
  },
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    errorElement: <div>Error occurred</div>,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: "about",
        element: <div>About</div>,
      },
    ],
  },
]);


