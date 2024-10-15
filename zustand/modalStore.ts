import { create } from "zustand";

type ModalStoreState = {
  isModal: boolean;
  isCreatePlayListModal: boolean;
  setIsModal: (isOn: boolean) => void;
  setIsCreatePlayListModal: (isOn: boolean) => void;
};

export const useModalStore = create<ModalStoreState>((set) => ({
  isModal: false,
  isCreatePlayListModal: false,
  setIsModal: (isOn: boolean) => set({ isModal: isOn }),
  setIsCreatePlayListModal: (isOn: boolean) =>
    set({ isCreatePlayListModal: isOn }),
}));
