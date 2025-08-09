import { apiClient } from "@/api";

export const cryptoApi = {
  //  Gets the chart data for the given period.
  getNavChartData: async (params?: { period?: string }) => {
    const response = await apiClient.get("/crypto/chart-data", {
      params,
    });
    return response.data;
  },

  // Gets the nav history data for the given days.
  getNavHistoryData: async (params?: { days?: string }) => {
    const response = await apiClient.get("/crypto/portfolio/nav-history", {
      params,
    });
    return response.data;
  },

  // Gets allocations daat
  getAllocations: async () => {
    const response = await apiClient.get("/allocation");
    return response.data;
  },

  // Gets the allocation data for the given key
  getAllocationByKey: async (key: string) => {
    const response = await apiClient.get(`/allocation/${key}`);
    return response.data;
  },

  // Get the portfolio latest data
  getPortfolioLatestData: async () => {
    const response = await apiClient.get("/crypto/portfolio/latest");
    return response.data;
  },
};
