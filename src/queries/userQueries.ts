/* eslint-disable @typescript-eslint/no-explicit-any */
import { userApi } from "@/services/userApi";
import { authStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useSingleUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.user.list(id),
    queryFn: () => userApi.getSingleUser(id),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
      toast.success(data.message || "Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
      toast.success(data.message || "User deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Delete failed");
    },
  });
};

export const useProfile = () => {
  const { token } = authStore();

  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: userApi.getProfile,
    enabled: !!token,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
      toast.success(data.message || "Profile updated successfully");
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
  });
};
