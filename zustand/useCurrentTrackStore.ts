import { create } from 'zustand';

type useCurrentTrackStoreState = {
  // 현재 재생 중인 노래 id 저장
  currentTrackURI: string;
  setCurrentTrackURI: (currentTrackURI: string) => void;

  // 노래 url (30초 미리듣기) 저장
  previewURL: string;
  setPreviewURL: (previewURL: string) => void;
};

/**
 * 노래 재생 상태, 정보 관리
 */
export const useCurrentTrackStore = create<useCurrentTrackStoreState>(
  (set) => ({
    currentTrackURI: '',
    setCurrentTrackURI: (currentTrackURI: string) => {
      set({ currentTrackURI: currentTrackURI });
    },

    previewURL: '',
    setPreviewURL: (previewURL: string) => {
      set({ previewURL });
    },
  }),
);
