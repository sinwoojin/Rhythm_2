import { create } from "zustand";

type FollowStoreState = {
  isFollowing: boolean; // 팔로우 상태
  follow: () => void; // 팔로우 기능
  unFollow: () => void; // 언팔로우 기능
};

export const useFollowStore = create<FollowStoreState>((set) => ({
  isFollowing: false,
  follow: () => set({ isFollowing: true }),
  unFollow: () => set({ isFollowing: false }),
}));
