import { api } from '@/api/spotifyApi';
import { setSpotifyVolume } from '@/api/spotifyMusicVolume';
import {
  pauseTrack,
  nextTrack as playNextTrack,
  previousTrack as playPreviousTrack,
  playTrack,
  resumeTrackFromLastPosition,
  playRandomTrack as shuffleTracks,
} from '@/api/spotifyPlayMusicAPI';
import { UserPlaylist } from '@/schema/type';
import { toast } from 'react-toastify';
import { create } from 'zustand';

interface SpotifyStoreState {
  player: Spotify.Player | null;
  setPlayer: (player: Spotify.Player) => void;

  accessToken: string | null;
  setAccessToken: (accessToken: SpotifyStoreState['accessToken']) => void;

  deviceId: string | null;
  setDeviceId: (deviceId: SpotifyStoreState['deviceId']) => void;

  currentTrack: Spotify.Track | null;
  setCurrentTrack: (currentTrack: SpotifyStoreState['currentTrack']) => void;

  isPaused: boolean;
  setIsPaused: (isPaused: SpotifyStoreState['isPaused']) => void;

  play: (trackURI: string | string[], index?: number) => void;

  pauseAndResumeTrack: (trackURI: string | string[], index?: number) => void;

  pause: () => void;

  shuffle: (playlistId: string) => void;

  playPrevTrack: () => void;

  playNextTrack: () => void;

  volume: number;
  setVolume: (percent: number) => void;

  deletePlaylist: (playlistId: string) => Promise<void>;

  getMyPlaylists: () => Promise<UserPlaylist | undefined>;

  addTrackToPlaylist: (uri: string, playlistId: string) => void;
}

const useSpotifyStore = create<SpotifyStoreState>((set, get) => ({
  player: null,
  setPlayer: (player) => set({ player }),

  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),

  deviceId: null,
  setDeviceId: (deviceId) => set({ deviceId }),

  currentTrack: null,
  setCurrentTrack: (currentTrack) => set({ currentTrack }),

  isPaused: true,
  setIsPaused: (isPaused) => set({ isPaused }),

  play: (contextUriOrTrackURIs: string | string[], index?: number) =>
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

      playTrack(contextUriOrTrackURIs, accessToken, deviceId, index);

      return prevState;
    }),

  pauseAndResumeTrack: (
    contextUriOrTrackURIs: string | string[],
    index?: number,
  ) =>
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

      resumeTrackFromLastPosition(
        contextUriOrTrackURIs,
        accessToken,
        deviceId,
        index,
      );

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

  shuffle: (playlistId: string) => {
    const { accessToken, deviceId } = get();
    if (!accessToken) return toast.warn('프리미엄 로그인이 필요한 기능입니다.');
    if (!deviceId) return toast.warn('현재 플레이 할 수 있는 기기가 없습니다.');

    shuffleTracks(accessToken, deviceId, playlistId);
  },

  playPrevTrack: () => {
    const { accessToken } = get();
    if (!accessToken)
      return toast.error('프리미엄 게정 로그인이 필요한 기능입니다.');

    playPreviousTrack(accessToken);
  },

  playNextTrack: () => {
    const { accessToken, deviceId } = get();
    if (!accessToken)
      return toast.error('프리미엄 게정 로그인이 필요한 기능입니다');

    playNextTrack(accessToken, String(deviceId));
  },

  volume: 50,

  setVolume: (percent) => {
    const { accessToken, deviceId } = get();
    if (!accessToken)
      return toast.error('프리미엄 게정 로그인이 필요한 기능입니다');
    if (!deviceId) return toast.warn('현재 플레이 할 수 있는 기기가 없습니다.');

    set({ volume: percent });
    setSpotifyVolume(accessToken, deviceId, String(percent));
  },

  deletePlaylist: async (playlistId) => {
    const { accessToken } = get();
    if (!accessToken) {
      toast.warn('프리미엄 로그인이 필요한 기능입니다.');
      return;
    }

    await api.playlist.deleteMyPlaylists(accessToken, playlistId);
  },

  getMyPlaylists: async (): Promise<UserPlaylist | undefined> => {
    const { accessToken } = get();
    if (!accessToken) {
      toast.warn('프리미엄 로그인이 필요한 기능입니다.');
      return;
    }
    const myPlaylists = await api.playlist.getMyPlaylists(accessToken);
    return myPlaylists;
  },

  addTrackToPlaylist: async (uri, playlistId) => {
    const { accessToken } = get();
    if (!accessToken) {
      toast.warn('프리미엄 로그인이 필요한 기능입니다.');
      return;
    }
    await api.userPlay.addTrackToPlaylists(accessToken, uri, playlistId);
  },
}));

export default useSpotifyStore;
