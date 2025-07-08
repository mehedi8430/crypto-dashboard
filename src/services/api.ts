import { apiClient } from "@/lib/api";

// Define the User type or import it from your models/types
export type TUser = {
  email: string;
  password: string;
  fullName: string;
  role: "ADMIN" | "USER";
  isDeleted?: boolean;
};

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

  refreshToken: async () => {
    const response = await apiClient.post("/auth/refresh");
    return response.data;
  },
};

export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  updateProfile: async (userData: Partial<User>) => {
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
