import { create } from "zustand";



type useCurrentTrackStoreState = {
  // 현재 재생 중인 노래 id 저장
  currentTrackId: string;
  setCurrentTrackId: (currentTrackId: string) => void;

  // 노래 url (30초 미리듣기) 저장
  previewURL: string;
  setPreviewURL: (previewURL: string) => void;

  // 현재 노래의 재생 상태 저장
  isPlaying: boolean;
  play: () => void;
  pause: () => void;

  // 정보 리셋
  reset: () => void;
};

/**
 * 노래 재생 상태, 정보 관리
 * 
 * 유저 정보를 각각의 브라우저에서 적용하기 위해 세션 스토리지 사용
 */
export const useCurrentTrackStore = create<useCurrentTrackStoreState>(
  (set) => ({
    currentTrackId: sessionStorage.getItem("currentTrackId") || "",
    setCurrentTrackId: (currentTrackId: string) => {
      sessionStorage.setItem("currentTrackId", currentTrackId);
      set({ currentTrackId });
    },

    previewURL: sessionStorage.getItem("previewURL") || "",
    setPreviewURL: (previewURL: string) => {
      sessionStorage.setItem("previewURL", previewURL);
      set({ previewURL });
    },

    isPlaying: sessionStorage.getItem("isPlaying") === "true",
    play: () => {
      sessionStorage.setItem("isPlaying", "true");
      set({ isPlaying: true });
    },
    pause: () => {
      sessionStorage.setItem("isPlaying", "false");
      set({ isPlaying: false });
    },

    reset: () => {
      sessionStorage.removeItem("currentTrackId");
      sessionStorage.removeItem("previewURL");
      sessionStorage.removeItem("isPlaying");
      set({ currentTrackId: "", previewURL: "", isPlaying: false });
    },
  })
);
