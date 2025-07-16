import { apiClient } from "@/api";

export const cryptoApi = {
  getNavChartData: async (params?: { period?: string }) => {
    const response = await apiClient.get("/crypto/chart-data", {
      params,
    });
    return response.data;
  },
};
