import { apiClient } from "@/api";
import type { TUser } from "@/types";

export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  updateProfile: async (userData: Partial<TUser>) => {
    const response = await apiClient.put("/users/:id", userData);
    return response.data;
  },

  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const response = await apiClient.get("/users", { params });
    return response.data;
  },
};
