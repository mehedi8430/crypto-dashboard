import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  token: string | null;
}

interface AuthActions {
  login: (token: string) => void;
  logout: () => void;
}

type TAuthStore = AuthState & AuthActions;

export const authStore = create<TAuthStore>()(
  persist(
    immer((set) => ({
      token: null,
      login: (token) => {
        set((state) => {
          state.token = token;
        });
      },
      logout: () => {
        set((state) => {
          state.token = null;
        });
      },
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
