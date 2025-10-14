import { useLibraryStore } from "./useIVIContainerStore";
import { useContainerStore } from "./useIVIContainerStore";
import { ContentDataStore } from "./useIVIContentDataStore";
import { useNavigationStore } from "./useIVINavigationStore";
import { useIVIRacing } from "./useIVIRacingStore";
import {
  useKeyboardStore,
  useKeyboardInput,
  useInputModalVisibleStore,
} from "./useKeyboardStore";
import { useNaviStateStore } from "./useNaviStateStore";
import { usePlayVideoStore } from "./usePlayVideoStore";

export const resetAllStores = () => {
  useContainerStore.getState().resetActiveContainerArray();
  useContainerStore.getState().setActiveContainer([]);
  useContainerStore.getState().setCount(0);
  useContainerStore.getState().setFilterBlur(false);

  useLibraryStore.getState().setLibraryState(false);

  ContentDataStore.getState().resetContentData();

  useNavigationStore.getState().resetNaviStore();
  useIVIRacing.getState().resetSetRacing();

  useKeyboardStore.getState().resetKeyboardStore();

  useKeyboardInput.getState().resetKeyboardInputStore();

  useInputModalVisibleStore.getState().resetInputModalStore();

  useNaviStateStore.getState().resetNaviStateStore();


  usePlayVideoStore.getState().resetPlayVideoStroe();
};
