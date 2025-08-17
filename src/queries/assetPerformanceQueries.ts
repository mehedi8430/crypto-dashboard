import { assetPerformanceApi } from "@/services/assetPerformanceApi";
import { useQuery } from "@tanstack/react-query";

// Query Keys
export const assetPerformanceQueryKeys = {
  assetPerformance: ["assetPerformance"] as const,
} as const;

// Fetches the assetPerformance data for the given minutes.
export const useAssetPerformanceData = (minutes: number) => {
  return useQuery({
    queryKey: assetPerformanceQueryKeys.assetPerformance,
    queryFn: () => assetPerformanceApi.getAssetPerformance(minutes),
  });
};
