import { create } from "zustand";

type ModalStoreState = {
  modal: { element: React.ReactElement; backdrop: boolean } | null;
  openModal: (modal: {
    element: React.ReactElement;
    backdrop: boolean;
  }) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStoreState>((set) => ({
  modal: null,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}));
