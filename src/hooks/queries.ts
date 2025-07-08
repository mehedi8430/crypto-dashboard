import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, userApi } from "@/services/api";
import { useAuthStore } from "@/stores";
import { toast } from "sonner";

// Query Keys
export const queryKeys = {
  auth: ["auth"] as const,
  user: {
    all: ["user"] as const,
    profile: () => [...queryKeys.user.all, "profile"] as const,
    list: (params?: any) => [...queryKeys.user.all, "list", params] as const,
  },
} as const;

// Auth Hooks
export const useLogin = () => {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      login(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
      toast.success("Login successful");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      login(data.user, data.token);
      toast.success(data.message || "Registration successful! Welcome!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registartion failed");
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success("Logged out successfully");
    },
    onError: (error: any) => {
      // Still logout on error
      logout();
      queryClient.clear();
      toast.error("Logout failed");
    },
  });
};

// User Hooks
export const useProfile = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: userApi.getProfile,
    enabled: isAuthenticated,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      updateUser(data);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });
};

export const useUsers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.user.list(params),
    queryFn: () => userApi.getUsers(params),
    keepPreviousData: true,
  });
};
