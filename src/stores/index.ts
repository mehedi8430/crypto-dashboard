import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// App State Store
type AppStore = {
  isLoading: boolean;
  theme: "light" | "dark";
  sidebarOpen: boolean;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isLoading: false,
      theme: "light",
      sidebarOpen: true,
      setLoading: (loading) => set({ isLoading: loading }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
