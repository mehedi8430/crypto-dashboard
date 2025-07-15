import { apiClient } from "@/api";
import type { TUser } from "@/types";

export const userApi = {
  getSingleUser: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (userData: Partial<TUser>, id: string) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

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
