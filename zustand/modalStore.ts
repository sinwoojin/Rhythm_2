import { create } from "zustand";

type ModalStoreState = {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
};

export const useModalStore = create<ModalStoreState>((set) => ({
  isModal: false,
  setIsModal: (isModal: boolean) => set({ isModal }),
}));
