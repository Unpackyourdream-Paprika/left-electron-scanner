import { create } from "zustand";

type Data = {
    x: number;
    y: number;
    prevX: number;
    prevY: number;
}

type Content = {
   [content: string]: Data
}

interface ContentData {
  contentData: Content;
  setContentData: (content: string, value: Data) => void;
  resetContentData: () => void;
}

export const ContentDataStore = create<ContentData>((set) => ({
  contentData: {
    'youtube': {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
    },
    'netflix': {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
    },
    'spotify': {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
    },
  },
  setContentData: (content, value) => {
    set((state) => ({
        contentData: {
            ...state.contentData,
            [content]: value
        }
    }))
  },
  resetContentData: () => set( { 
    contentData: {
      'youtube': {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
      },
      'netflix': {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
      },
      'spotify': {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
      },
  }})
}));
