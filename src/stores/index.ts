import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Auth Store with persistence
type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
};

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set((state) => {
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
        }),
      logout: () =>
        set((state) => {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }),
      updateUser: (userData) =>
        set((state) => {
          if (state.user) {
            Object.assign(state.user, userData);
          }
        }),
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

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
