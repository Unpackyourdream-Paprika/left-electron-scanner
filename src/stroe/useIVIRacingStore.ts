import { create } from "zustand";

interface RacingStatus {
  modeTab: string;
  trackMode: boolean;
  trackPreset: string;
  sound: number;
  repeat: boolean;
  turnNum: number;
  audioType: string;
  setModeTab: (modeTab: string) => void;
  setTrackMode: (mode: boolean) => void;
  setTrackPreset: (trackPreset: string) => void;
  setTurnNum: (turnNum: number) => void;
  setAudioType: (type: string) => void;
  setSound: (sound: number) => void;
  resetSetRacing: () => void;
}

export const useIVIRacing = create<RacingStatus>((set) => ({
  modeTab: "road", // road | track | log
  trackMode: true,
  trackPreset: "dry", // dry | wet | soft
  sound: 0,
  repeat: false,
  turnNum: 0,
  audioType: "",
  setModeTab: (tab) => set({ modeTab: tab }),
  setTrackMode: (mode) => set({ trackMode: mode }),
  setTrackPreset: (trackPreset) => set({ trackPreset: trackPreset }),
  setTurnNum: (turnNum) => set({ turnNum: turnNum }),
  setAudioType: (type) => set({ audioType: type }),
  setSound: (sound) => set({ sound: sound }),

  resetSetRacing: () =>
    set({
      modeTab: "road",
      trackMode: true,
      trackPreset: "dry",
      sound: 0,
      repeat: false,
      turnNum: 0,
      audioType: "",
    }),
}));
