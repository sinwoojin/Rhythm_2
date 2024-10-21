import { create } from 'zustand';

type useLogInInfoStoreProps = {
  toast: { element: React.ReactElement } | null;
  showToast: (toast: { element: React.ReactElement }) => void;
  closeToast: () => void;
};

export const useLogInInfoStore = create<useLogInInfoStoreProps>((set) => ({
  toast: null,
  showToast: (toast) => set({ toast }),
  closeToast: () => set({ toast: null }),
}));
