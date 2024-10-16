import { create } from "zustand";

interface ImgState {
  imgUrl: string;
  setImgUrl: (newText: string) => void;
}

export const useImgStore = create<ImgState>((set) => ({
  imgUrl: "",
  setImgUrl: (newText: string) => set({ imgUrl: newText }),
}));
