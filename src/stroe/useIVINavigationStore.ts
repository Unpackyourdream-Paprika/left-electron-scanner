import { create } from "zustand";

export interface DestinationProps {
  name: string;
  address: string;
  distance: string;
}

interface NavigationStore {
  isNavigation: boolean;
  isNaviWrapActive: boolean;
  destination: DestinationProps | null;
  setNavigation: (isActive: boolean, dest?: DestinationProps | null) => void;
  setNaviWrapActive: (isWrapActive: boolean) => void;
  resetNaviStore: () => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  isNavigation: false,
  isNaviWrapActive: false,
  destination: null,
  setNavigation: (isActive, dest = null) =>
    set({
      isNavigation: isActive,
      destination: dest,
    }),
  setNaviWrapActive: (isWrapActive) =>
    set((state) => ({
      ...state,
      isNaviWrapActive: isWrapActive,
    })),
  resetNaviStore: () =>
    set({
      isNavigation: false,
      isNaviWrapActive: false,
      destination: null,
    }),
}));
