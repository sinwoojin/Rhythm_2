import {
  pauseTrack,
  nextTrack as playNextTrack,
  previousTrack as playPreviousTrack,
  playTrack,
  playRandomTrack as shuffleTracks,
} from '@/api/spotifyPlayMusicAPI';
import { PlayTrack } from '@/schema/type';
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
        alert('No spotify accessToken');
        return prevState;
      }
      if (!deviceId) {
        alert('No spotify deviceId');
        return prevState;
      }

      playTrack(trackURI, accessToken, deviceId);

      return prevState;
    }),

  pause: () =>
    set((prevState) => {
      const { accessToken } = prevState;

      if (!accessToken) {
        alert('No spotify accessToken');
        return prevState;
      }

      pauseTrack(accessToken);
      return prevState;
    }),

  shuffle: () => {
    const { accessToken, deviceId } = get();
    if (!accessToken) return alert('No spotify accessToken');
    if (!deviceId) return alert('No spotify deviceId');

    shuffleTracks(accessToken, deviceId);
  },
  playPrevTrack: () => {
    const { accessToken } = get();
    if (!accessToken) return alert('No spotify accessToken');

    playPreviousTrack(accessToken);
  },
  playNextTrack: () => {
    const { accessToken } = get();
    if (!accessToken) return alert('No spotify accessToken');

    playNextTrack(accessToken);
  },
}));

export default useSpotifyStore;
