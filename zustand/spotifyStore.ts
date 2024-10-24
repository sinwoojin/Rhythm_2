import {
  pauseTrack,
  nextTrack as playNextTrack,
  previousTrack as playPreviousTrack,
  playTrack,
  playRandomTrack as shuffleTracks,
} from '@/api/spotifyPlayMusicAPI';
import { PlayTrack } from '@/schema/type';
import { toast } from 'react-toastify';
import { create } from 'zustand';

interface SpotifyStoreState {
  accessToken: string | null;
  setAccessToken: (accessToken: SpotifyStoreState['accessToken']) => void;

  deviceId: string | null;
  setDeviceId: (deviceId: SpotifyStoreState['deviceId']) => void;

  currentTrack: PlayTrack | null;
  setCurrentTrack: (currentTrack: SpotifyStoreState['currentTrack']) => void;

  isPaused: boolean;
  setIsPaused: (isPaused: SpotifyStoreState['isPaused']) => void;

  play: (trackURI: string) => void;

  pause: () => void;

  shuffle: () => void;

  playPrevTrack: () => void;

  playNextTrack: () => void;
}

const useSpotifyStore = create<SpotifyStoreState>((set, get) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),

  deviceId: null,
  setDeviceId: (deviceId) => set({ deviceId }),

  currentTrack: null,
  setCurrentTrack: (currentTrack) => set({ currentTrack }),

  isPaused: true,
  setIsPaused: (isPaused) => set({ isPaused }),

  play: (trackURI) =>
    set((prevState) => {
      const { accessToken, deviceId } = prevState;
      if (!accessToken) {
        toast.warn('Spotify 프리미엄 계정으로 로그인 해주세요');
        return prevState;
      }
      if (!deviceId) {
        toast.error('재생할 수 있는 기기가 없습니다');
        return prevState;
      }

      playTrack(trackURI, accessToken, deviceId);

      return prevState;
    }),

  pause: () =>
    set((prevState) => {
      const { accessToken } = prevState;

      if (!accessToken) {
        return prevState;
      }

      pauseTrack(accessToken);
      return prevState;
    }),

  shuffle: () => {
    const { accessToken, deviceId } = get();
    if (!accessToken) return toast.warn('프리미엄 로그인이 필요한 기능입니다.');
    if (!deviceId) return toast.warn('현재 플레이 할 수 있는 기기가 없습니다.');

    shuffleTracks(accessToken, deviceId);
  },
  playPrevTrack: () => {
    const { accessToken } = get();
    if (!accessToken)
      return toast.error('프리미엄 게정 로그인이 필요한 기능입니다.');

    playPreviousTrack(accessToken);
  },
  playNextTrack: () => {
    const { accessToken } = get();
    if (!accessToken)
      return toast.error('프리미엄 게정 로그인이 필요한 기능입니다');

    playNextTrack(accessToken);
  },
}));

export default useSpotifyStore;
