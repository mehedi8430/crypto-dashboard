/* eslint-disable @typescript-eslint/no-explicit-any */
import { cryptoApi } from "@/services/cryptoApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Query Keys
export const cryptoQueryKeys = {
  crypto: ["crypto"] as const,
  allocation: ["allocation"] as const,
  chartData: (params?: any) =>
    [...cryptoQueryKeys.crypto, "chartData", params] as const,
  portfolio: (params?: any) =>
    [...cryptoQueryKeys.crypto, "portfolio", params] as const,
} as const;

// Fetches the chart data for the given period.
export const useNavChartData = (params?: { period?: string }) => {
  return useQuery({
    queryKey: cryptoQueryKeys.chartData(params),
    queryFn: () => cryptoApi.getNavChartData(params),
  });
};

// Fetches the nav history data for the given days.
export const useNavHistoryData = (params?: { days?: string }) => {
  return useQuery({
    queryKey: cryptoQueryKeys.chartData(params),
    queryFn: () => cryptoApi.getNavHistoryData(params),
  });
};

// Fetches the allocations data
export const useAllocations = () => {
  return useQuery({
    queryKey: cryptoQueryKeys.allocation,
    queryFn: () => cryptoApi.getAllocations(),
  });
};

// creates a new allocation
export const useCreateAllocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cryptoApi.createAllocation,
    onSuccess: (data) => {
      toast.success(data.message || "Allocation created successfully!");
      queryClient.invalidateQueries({ queryKey: cryptoQueryKeys.allocation });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Allocation Creation failed"
      );
    },
  });
};

// Fetches the allocation data for the given key
export const useAllocationByKey = (key: string) => {
  return useQuery({
    queryKey: cryptoQueryKeys.chartData(key),
    queryFn: () => cryptoApi.getAllocationByKey(key),
  });
};

// Fetches the portfolio latest data
export const usePortfolioLatestData = () => {
  return useQuery({
    queryKey: cryptoQueryKeys.portfolio(),
    queryFn: () => cryptoApi.getPortfolioLatestData(),
  });
};

// Fetches the system status data
export const useSystemStatus = () => {
  return useQuery({
    queryKey: cryptoQueryKeys.portfolio(),
    queryFn: () => cryptoApi.getSystemStatus(),
  });
};
