import { create } from "zustand";

interface KeyboardStore {
  keyboardInputState: boolean;
  setKeyboardInputState: (state: boolean) => void;
  resetKeyboardStore: () => void;
}

export const useKeyboardStore = create<KeyboardStore>((set) => ({
  keyboardInputState: false,
  setKeyboardInputState: (state) => set({ keyboardInputState: state }),
  resetKeyboardStore: () => {
    return set({
      keyboardInputState: false,
    });
  },
}));

interface InputModalStore {
  isModalVisible: boolean;
  setIsModalVisible: (state: boolean) => void;
  resetInputModalStore: () => void;
}

export const useInputModalVisibleStore = create<InputModalStore>((set) => ({
  isModalVisible: false,
  setIsModalVisible: (state) => set({ isModalVisible: state }),
  resetInputModalStore: () => {
    return set({
      isModalVisible: false,
    });
  },
}));

interface KeyboardInputStore {
  KeyboardInput: string;
  setKeyboardInput: (state: string) => void;
  resetKeyboardInputStore: () => void;
}

export const useKeyboardInput = create<KeyboardInputStore>((set) => ({
  KeyboardInput: "",
  setKeyboardInput: (state) => set({ KeyboardInput: state }),
  resetKeyboardInputStore: () => {
    return set({
      KeyboardInput: "",
    });
  },
}));
