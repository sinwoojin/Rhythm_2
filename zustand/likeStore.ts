import { create } from 'zustand';

type LikeStoreState = {
  isLike: boolean;
  like: () => void;
  unLike: () => void;
};

export const useLikeStore = create<LikeStoreState>((set) => ({
  isLike: false,
  like: () => set({ isLike: true }),
  unLike: () => set({ isLike: false }),
}));
