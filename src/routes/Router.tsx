import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import HomePage from "@/pages/Home";
import { createBrowserRouter } from "react-router";
import DailyReport from "@/pages/DailyReport/index";
import DataForms from "@/pages/DataForms";
import Allocations from "@/pages/Allocations";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import Users from "@/pages/Users";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error occurred</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  // Dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute roles={["ADMIN", "USER"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <div>Error occurred</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "report",
        element: (
          <ProtectedRoute roles={["ADMIN", "USER"]}>
            <DailyReport />
          </ProtectedRoute>
        ),
      },
      {
        path: "allocations",
        children: [
          {
            path: "a",
            element: (
              <ProtectedRoute roles={["ADMIN", "USER"]}>
                <Allocations />
              </ProtectedRoute>
            ),
          },
          {
            path: "b",
            element: (
              <ProtectedRoute roles={["ADMIN", "USER"]}>
                <Allocations />
              </ProtectedRoute>
            ),
          },
          {
            path: "c",
            element: (
              <ProtectedRoute roles={["ADMIN", "USER"]}>
                <Allocations />
              </ProtectedRoute>
            ),
          },
          {
            path: "d",
            element: (
              <ProtectedRoute roles={["ADMIN", "USER"]}>
                <Allocations />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "users",
        element: (
          <ProtectedRoute roles={["ADMIN"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-data-forms",
        element: (
          <ProtectedRoute roles={["ADMIN"]}>
            <DataForms />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
