/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSocket } from "@/hooks/useSocket";

export function useCryptoNavHistory(url?: string) {
  return useSocket<any[]>(
    {
      url: url || import.meta.env.REACT_APP_SOCKET_URL,
      options: {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      },
    },
    {
      event: "crypto_nav_history",
      errorEvent: "crypto_nav_history_error",
    }
  );
}

export function useCryptoPortfolio(url?: string) {
  return useSocket(
    {
      url: url || import.meta.env.REACT_APP_SOCKET_URL,
      options: {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      },
    },
    {
      event: "crypto_portfolio_latest",
      errorEvent: "crypto_portfolio_latest_error",
    }
  );
}

export function useCryptoAssetPerformance(url?: string) {
  return useSocket(
    {
      url: url || import.meta.env.REACT_APP_SOCKET_URL,
      options: {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      },
    },
    {
      event: "crypto_asset_performance",
      errorEvent: "crypto_asset_performance_error",
    }
  );
}

export function useCryptoChartData(url?: string) {
  return useSocket<any[]>(
    {
      url: url || import.meta.env.REACT_APP_SOCKET_URL,
      options: {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      },
    },
    {
      event: "crypto_chart_data",
      errorEvent: "crypto_chart_data_error",
    }
  );
}

export function useCryptoSystemStatus(url?: string) {
  return useSocket(
    {
      url: url || import.meta.env.REACT_APP_SOCKET_URL,
      options: {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      },
    },
    {
      event: "crypto_system_status",
      errorEvent: "crypto_system_status_error",
    }
  );
}

export function useCryptoCurrentPrices(url?: string) {
  return useSocket(
    {
      url: url || import.meta.env.REACT_APP_SOCKET_URL,
      options: {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      },
    },
    {
      event: "crypto_current_prices",
      errorEvent: "crypto_current_prices_error",
    }
  );
}

export function useCryptoPortfolioSummary(url?: string) {
  return useSocket(
    {
      url: url || import.meta.env.REACT_APP_SOCKET_URL,
      options: {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      },
    },
    {
      event: "crypto_portfolio_summary",
      errorEvent: "crypto_portfolio_summary_error",
    }
  );
}

export function useCryptoHealthCheck(url?: string) {
  return useSocket(
    {
      url: url || import.meta.env.REACT_APP_SOCKET_URL,
      options: {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      },
    },
    {
      event: "crypto_health_check",
      errorEvent: "crypto_health_check_error",
    }
  );
}
