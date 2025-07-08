import { useAuthStore } from "@/stores";
import { useProfile } from "./queries";

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout } = useAuthStore();
  const { data: profile, isLoading } = useProfile();

  return {
    user: profile || user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
