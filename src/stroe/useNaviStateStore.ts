import { create } from "zustand";

interface useNaviStateStoreProps {
  isNavigating: boolean;
  setIsNavigating: (state: boolean) => void;
  resetNaviStateStore: () => void;
}

export const useNaviStateStore = create<useNaviStateStoreProps>((set) => ({
  isNavigating: false, // 기본값 (초기 상태)
  setIsNavigating: (state) => set({ isNavigating: state }),
  resetNaviStateStore: () =>
    set({
      isNavigating: false,
    }),
}));
