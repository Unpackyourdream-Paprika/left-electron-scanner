import { create } from "zustand";

interface PlayVideoStore {
  playVideo: string;
  setPlayVideo: (container: string) => void;
  resetPlayVideoStroe: () => void;
}

export const usePlayVideoStore = create<PlayVideoStore>((set) => ({
  playVideo: "",
  setPlayVideo: (container) => set({ playVideo: container }),

  resetPlayVideoStroe: () =>
    set({
      playVideo: "",
    }),
}));
