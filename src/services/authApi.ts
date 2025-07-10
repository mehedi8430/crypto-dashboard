import { apiClient } from "@/api";
import type { TUser } from "@/types";

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  register: async (userData: TUser) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  logout: async () => {
    await apiClient.post("/auth/logout");
  },

  //   refreshToken: async () => {
  //     const response = await apiClient.post("/auth/refresh");
  //     return response.data;
  //   },
};
