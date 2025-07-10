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

export const useProfile = () => {
  const { isAuthenticated } = authStore();

  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: userApi.getProfile,
    enabled: isAuthenticated,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = authStore();

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
    // keepPreviousData: true,
  });
};
