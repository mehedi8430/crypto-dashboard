import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

type UserRole = "USER" | "ADMIN";

type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
  roles?: UserRole[];
};

export const ProtectedRoute = ({
  children,
  redirectTo = "/login",
  roles,
}: ProtectedRouteProps) => {
  const userData = useAuth();

  if (!userData?.id) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!roles) {
    return <Navigate to={redirectTo} replace />;
  }

  const isRoleMatched = roles?.find((role) => userData?.role === role);
  if (!isRoleMatched) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
