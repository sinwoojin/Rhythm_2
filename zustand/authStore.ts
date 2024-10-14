import { create } from "zustand";

type AuthStoreState = {
	// 로그인 타입 (헤더)
	isLoggedIn: boolean;
	LogIn: () => void;
	LogOut: () => void;

	// 유저 정보 타입 (버튼 컴포넌트)
	isUser: boolean;
	setIsUser: () => void;
	setIsNotUser: () => void;

	// 로딩 상태
	isAuthInitialized: boolean;
	setAuthInitialized: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
	isLoggedIn: false,
	LogIn: () => set({ isLoggedIn: true }),
	LogOut: () => set({ isLoggedIn: false }),

	isUser: false,
	setIsUser: () => set({ isUser: true }),
	setIsNotUser: () => set({ isUser: false }),

	isAuthInitialized: false,
	setAuthInitialized: () => set({ isAuthInitialized: true }),
}));
