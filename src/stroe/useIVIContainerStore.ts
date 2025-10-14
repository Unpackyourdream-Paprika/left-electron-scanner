import { create } from "zustand";

type contentData = {
  name: string;
  count: number;
};
const setData = (): contentData[] => {
  const arr = [];
  for (let i = 0; i < 20; i++) {
    const data = {
      name: "",
      count: 0,
    };
    arr.push(data);
  }
  return arr;
};

interface ContainerStore {
  activeContainerArray: contentData[];
  activeContainer: string[];
  count: number;
  filterBlur: boolean;
  setActiveContainerArray: (container: contentData[]) => void;
  setActiveContainer: (container: string[]) => void;
  resetActiveContainerArray: () => void;
  setCount: (state: number) => void;
  setFilterBlur: (state: boolean) => void;
}

export const useContainerStore = create<ContainerStore>((set) => ({
  activeContainerArray: setData(),
  activeContainer: [],
  count: 0,
  filterBlur: false,
  setActiveContainerArray: (container) => {
    set(() => ({
      activeContainerArray: container,
    }));
  },
  setActiveContainer: (container) => set({ activeContainer: container }),
  resetActiveContainerArray: () => {
    set(() => ({ activeContainerArray: setData() }));
  },
  setCount: (state) => set({ count: state }),
  setFilterBlur: (state) => set({ filterBlur: state }),
}));

interface LibraryStore {
  libraryState: boolean;
  setLibraryState: (state: boolean) => void;
}

export const useLibraryStore = create<LibraryStore>((set) => ({
  libraryState: false,
  setLibraryState: (state) => set({ libraryState: state }),
}));
