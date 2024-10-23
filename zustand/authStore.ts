import { create } from 'zustand';

// 유저 정보 타입
type CurrentUser = {
  id?: string;
  userName?: string | undefined;
  email?: string;
  content?: string | null | undefined;
  imgUrl?: string | null;
  spotifyId?: string;
} | null;

type AuthStoreState = {
  // 로그인 상태
  isLoggedIn: boolean;
  LogIn: () => void;
  LogOut: () => void;

  // 로딩 상태
  isAuthInitialized: boolean;
  setAuthInitialized: () => void;

  // 현재 로그인한 유저 정보
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  isLoggedIn: false,
  LogIn: () => set({ isLoggedIn: true }),
  LogOut: () => set({ isLoggedIn: false, currentUser: null }),

  isAuthInitialized: false,
  setAuthInitialized: () => set({ isAuthInitialized: true }),

  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
