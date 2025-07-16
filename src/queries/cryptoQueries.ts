/* eslint-disable @typescript-eslint/no-explicit-any */
import { cryptoApi } from "@/services/cryptoApi";
import { useQuery } from "@tanstack/react-query";

// Query Keys
export const cryptoQueryKeys = {
  crypto: ["crypto"] as const,
  chartData: (params?: any) =>
    [...cryptoQueryKeys.crypto, "chartData", params] as const,
} as const;

export const useNavChartData = (params?: { period?: string }) => {
  return useQuery({
    queryKey: cryptoQueryKeys.chartData(params),
    queryFn: () => cryptoApi.getNavChartData(params),
  });
};
