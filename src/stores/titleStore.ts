import { create } from 'zustand';

type TitleStore = {
  title: string;
  setTitle: (title: string) => void;
};

export const useTitleStore = create<TitleStore>((set) => ({
  title: 'Dashboard',
  setTitle: (title) => set({ title }),
}));
