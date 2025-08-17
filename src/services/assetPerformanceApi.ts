import { apiClient } from "@/api";

export const assetPerformanceApi = {
  //  Get asset performance data for the given minutes
  getAssetPerformance: async (minutes: number) => {
    const response = await apiClient.get(
      `/asset-performance/?minutes=${minutes}`
    );
    return response.data;
  },
};
