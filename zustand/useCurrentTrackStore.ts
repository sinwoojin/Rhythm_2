import { create } from 'zustand';

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
 */
export const useCurrentTrackStore = create<useCurrentTrackStoreState>(
  (set) => ({
    currentTrackId: '',
    setCurrentTrackId: (currentTrackId: string) => {
      set({ currentTrackId });
    },

    previewURL: '',
    setPreviewURL: (previewURL: string) => {
      set({ previewURL });
    },

    isPlaying: false,
    play: () => {
      set({ isPlaying: true });
    },
    pause: () => {
      set({ isPlaying: false });
    },

    reset: () => {
      set({ currentTrackId: '', previewURL: '', isPlaying: false });
    },
  }),
);
