export const mockData = {
    reportDate: "2024-07-15",
    nav: {
      startingNav: 100000,
      endingNav: 105000,
      growthPercent: 5,
      chartData: [
        { date: "2024-07-01", time: "09:00", nav: 100000 },
        { date: "2024-07-02", time: "09:00", nav: 101000 },
        { date: "2024-07-03", time: "09:00", nav: 102000 },
        { date: "2024-07-04", time: "09:00", nav: 101500 },
        { date: "2024-07-05", time: "09:00", nav: 103000 },
        { date: "2024-07-06", time: "09:00", nav: 104000 },
        { date: "2024-07-07", time: "09:00", nav: 105000 },
      ],
    },
    allocationBreakdown: {
      A_percent: 30,
      B_percent: 25,
      C_percent: 20,
      D_percent: 15,
      auditPac_percent: 10,
    },
    allocations: {
      A: {
        name: "Allocation A",
        startingBalance: 30000,
        dailyGain: 1500,
        dailyGainPercent: 5,
        endingBalance: 31500,
        notes: "Core holdings performed well.",
        chartData: [
          { date: "2024-07-01", time: "09:00", balance: 30000 },
          { date: "2024-07-02", time: "09:00", balance: 30500 },
          { date: "2024-07-03", time: "09:00", balance: 31000 },
          { date: "2024-07-04", time: "09:00", balance: 30800 },
          { date: "2024-07-05", time: "09:00", balance: 31200 },
          { date: "2024-07-06", time: "09:00", balance: 31400 },
          { date: "2024-07-07", time: "09:00", balance: 31500 },
        ],
        dailyPerformanceHistory: [
            { date: "2024-07-07", balance: 31500, dailyChange: 100, percentChange: 0.32, notes: "Stable growth" }
        ],
        lastPayout: new Date().toISOString(),
        nextUnlock: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      B: {
          name: "Allocation B",
          startingBalance: 25000,
          dailyGain: 1250,
          dailyGainPercent: 5,
          endingBalance: 26250,
          notes: "Growth strategy showing promise.",
          chartData: [
              { date: "2024-07-01", time: "09:00", balance: 25000 },
              { date: "2024-07-07", time: "09:00", balance: 26250 },
          ],
          dailyPerformanceHistory: [
              { date: "2024-07-07", balance: 26250, dailyChange: 150, percentChange: 0.57, notes: "Positive trend" }
          ],
          lastPayout: new Date().toISOString(),
          nextUnlock: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      C: {
          name: "Allocation C",
          startingBalance: 20000,
          dailyGain: 1000,
          dailyGainPercent: 5,
          endingBalance: 21000,
          notes: "Alternative assets are stable.",
          chartData: [
              { date: "2024-07-01", time: "09:00", balance: 20000 },
              { date: "2024-07-07", time: "09:00", balance: 21000 },
          ],
          dailyPerformanceHistory: [
              { date: "2024-07-07", balance: 21000, dailyChange: 50, percentChange: 0.24, notes: "Steady" }
          ],
          lastPayout: new Date().toISOString(),
          nextUnlock: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      D: {
          name: "Allocation D",
          startingBalance: 15000,
          dailyGain: 750,
          dailyGainPercent: 5,
          endingBalance: 15750,
          notes: "Exploring new opportunities.",
          chartData: [
              { date: "2024-07-01", time: "09:00", balance: 15000 },
              { date: "2024-07-07", time: "09:00", balance: 15750 },
          ],
          dailyPerformanceHistory: [
              { date: "2024-07-07", balance: 15750, dailyChange: 20, percentChange: 0.13, notes: "Initial phase" }
          ],
          lastPayout: new Date().toISOString(),
          nextUnlock: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
    assetPerformance: {
      ETH: { symbol: "ETH", open: 3000, close: 3100, changePercent: 3.33, volumeUsd: 1500000000 },
      BTC: { symbol: "BTC", open: 60000, close: 62000, changePercent: 3.33, volumeUsd: 30000000000 },
      TUSD: { symbol: "TUSD", open: 1, close: 1, changePercent: 0, volumeUsd: 500000000 },
      USDT: { symbol: "USDT", open: 1, close: 1, changePercent: 0, volumeUsd: 70000000000 },
      DAI: { symbol: "DAI", open: 1, close: 1, changePercent: 0, volumeUsd: 200000000 },
      SUSD: { symbol: "SUSD", open: 1, close: 1, changePercent: 0, volumeUsd: 10000000 },
    },
    systemStatus: {
      tradingEngine: true,
      dataFeeds: true,
      riskManagement: true,
      compliance: true,
      lastSyncSuccess: true,
    },
    visualFlags: {
      tradingEngine: "green",
      dataFeeds: "green",
      riskManagement: "green",
      compliance: "green",
      systemSync: "green",
    },
    teamNotes: {
      devStatus: "All systems operational",
      developer: "Admin",
      expectedPreview: "N/A",
      dataEntryMode: "Manual",
    },
    dailyReportText: "A brief summary of today's market performance and outlook.",
  };