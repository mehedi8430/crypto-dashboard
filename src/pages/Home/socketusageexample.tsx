// Example 1: Using specific crypto hooks
import {
  useCryptoNavHistory,
  useCryptoPortfolio,
  useCryptoCurrentPrices,
} from "@/hooks/useSocket";

function CryptoNavComponent() {
  const {
    data: navHistory,
    loading,
    error,
    isConnected,
    emit,
  } = useCryptoNavHistory();

  const handleRequestUpdate = () => {
    emit("request_nav_history", { days: 30 });
  };

  if (loading) return <div>Loading NAV data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>NAV History {isConnected ? "🟢" : "🔴"}</h3>
      <button onClick={handleRequestUpdate}>Refresh NAV Data</button>
      {navHistory && (
        <ul>
          {navHistory.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Example 2: Using generic useSocket hook with custom event
import { useSocket } from "@/hooks/useSocket";

function CustomEventComponent() {
  const { data, loading, error, emit } = useSocket<{
    message: string;
    timestamp: number;
  }>(
    {
      url: "ws://localhost:3000",
    },
    {
      event: "custom_data_event",
      errorEvent: "custom_data_error", // Optional custom error event name
      onData: (responseData) => {
        // Custom data processing
        console.log("Custom processing:", responseData);
      },
      onError: (errorData) => {
        // Custom error handling
        console.error("Custom error handling:", errorData);
      },
    }
  );

  return (
    <div>
      <h3>Custom Event Data</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data && (
        <div>
          <p>Message: {data.message}</p>
          <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

// Example 3: Multiple specific hooks in one component
function CryptoDashboard() {
  const navHistory = useCryptoNavHistory();
  const portfolio = useCryptoPortfolio();
  const prices = useCryptoCurrentPrices();
  const chartData = useCryptoChartData();

  const allConnected = [navHistory, portfolio, prices, chartData].every(
    (hook) => hook.isConnected
  );

  const hasErrors = [navHistory, portfolio, prices, chartData].some(
    (hook) => hook.error
  );

  const isLoading = [navHistory, portfolio, prices, chartData].some(
    (hook) => hook.loading
  );

  return (
    <div>
      <h2>Crypto Dashboard</h2>
      <div>
        Status: {allConnected ? "🟢 All Connected" : "🔴 Some Disconnected"}
      </div>

      {hasErrors && (
        <div style={{ color: "red" }}>
          Errors detected in one or more data streams
        </div>
      )}

      {isLoading && <div>Loading data...</div>}

      <section>
        <h3>NAV History</h3>
        {navHistory.data ? (
          <pre>{JSON.stringify(navHistory.data, null, 2)}</pre>
        ) : (
          <p>No NAV data available</p>
        )}
      </section>

      <section>
        <h3>Portfolio</h3>
        {portfolio.data ? (
          <pre>{JSON.stringify(portfolio.data, null, 2)}</pre>
        ) : (
          <p>No portfolio data available</p>
        )}
      </section>

      <section>
        <h3>Current Prices</h3>
        {prices.data ? (
          <pre>{JSON.stringify(prices.data, null, 2)}</pre>
        ) : (
          <p>No price data available</p>
        )}
      </section>

      <section>
        <h3>Chart Data</h3>
        {chartData.data ? (
          <pre>{JSON.stringify(chartData.data, null, 2)}</pre>
        ) : (
          <p>No chart data available</p>
        )}
      </section>
    </div>
  );
}

// Example 4: Request-Response pattern
function RequestResponseExample() {
  const {
    data: portfolioData,
    loading,
    error,
    emit,
    clearData,
  } = useCryptoPortfolio();

  const handleGetPortfolio = (userId: string) => {
    clearData(); // Clear previous data
    emit("get_portfolio", { userId });
  };

  const handleRefresh = () => {
    emit("refresh_portfolio");
  };

  return (
    <div>
      <h3>Portfolio Data</h3>
      <div>
        <button onClick={() => handleGetPortfolio("user123")}>
          Get Portfolio for User123
        </button>
        <button onClick={handleRefresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {portfolioData && (
        <div>
          <h4>Portfolio Details:</h4>
          <pre>{JSON.stringify(portfolioData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Example 5: TypeScript with specific data types
interface NavHistoryItem {
  date: string;
  endingNav: number;
  growthPercent: number;
}

function TypedNavHistoryComponent() {
  const {
    data: navHistory,
    loading,
    error,
    isConnected,
  } = useSocket<NavHistoryItem[]>(
    {
      url: "ws://localhost:5050",
    },
    {
      event: "crypto_nav_history",
    }
  );

  const totalGrowth =
    navHistory?.reduce((sum, item) => sum + item.growthPercent, 0) || 0;

  return (
    <div>
      <h3>Typed NAV History {isConnected ? "🟢" : "🔴"}</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {navHistory && (
        <div>
          <p>Total Growth: {totalGrowth.toFixed(2)}%</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Ending NAV</th>
                <th>Growth %</th>
              </tr>
            </thead>
            <tbody>
              {navHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.endingNav.toFixed(2)}</td>
                  <td>{item.growthPercent.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
