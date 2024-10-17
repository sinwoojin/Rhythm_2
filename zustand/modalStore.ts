import { create } from "zustand";

type ModalStoreState = {
  isOnLogInModal: boolean;
  isOnCreatePlayListModal: boolean;
  isOnLyricsModal: boolean;
  isOnOptionModal: boolean;
  setIsOnLogInModal: (isOn: boolean) => void;
  setIsOnCreatePlayListModal: (isOn: boolean) => void;
  setIsOnLyricsModal: (isOn: boolean) => void;
  setIsOnOptionModal: (isOn: boolean) => void;
};

export const useModalStore = create<ModalStoreState>((set) => ({
  isOnLogInModal: false,
  isOnCreatePlayListModal: false,
  isOnLyricsModal: false,
  isOnOptionModal: false,
  setIsOnLogInModal: (isOn: boolean) => set({ isOnLogInModal: isOn }),
  setIsOnCreatePlayListModal: (isOn: boolean) =>
    set({ isOnCreatePlayListModal: isOn }),
  setIsOnLyricsModal: (isOn: boolean) => set({ isOnLyricsModal: isOn }),
  setIsOnOptionModal: (isOn: boolean) => set({ isOnOptionModal: isOn }),
}));
