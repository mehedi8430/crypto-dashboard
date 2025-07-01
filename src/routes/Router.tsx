import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import Allocations from "@/pages/allocations";
import HomePage from "@/pages/Home";
import { createBrowserRouter } from "react-router";
import DailyReport from "@/pages/DailyReport/index";
import DataForms from "@/pages/DataForms";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error occurred</div>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <div>Error occurred</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "report",
        element: <DailyReport />,
      },
      {
        path: 'allocations',
        children: [
          {
            path: 'a',
            element: <Allocations />
          },
          {
            path: 'b',
            element: <Allocations />
          },
          {
            path: 'c',
            element: <Allocations />
          },
        ]
      },
      {
        path: 'create-data-forms',
        element: <DataForms />
      },
    ],
  },
]);
