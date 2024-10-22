import { PlayTrack } from '@/schema/type';
import { api } from './spotifyApi';

/**
 * spotify 로그인 토큰 설정
 * @param setAccessToken
 */
export const fetchAccessToken = async (
  setAccessToken: (storedToken: string) => void,
) => {
  const user = await api.getUser.getUser();
  const currentProvider = user?.app_metadata.provider;

  if (!currentProvider) return;

  if (currentProvider === 'spotify') {
    try {
      const storedToken = window.localStorage.getItem('spotify_provider_token'); //토큰을 localStorage에서 가져오는 함수
      if (storedToken) setAccessToken(storedToken);
    } catch (error) {
      console.error('Access Token 가져오기 오류:', error);
      alert(
        'Access Token을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.',
      );
    }
  }
};

interface SpotifySDKProps {
  accessToken: string;
  setDeviceId: (deviceId: string) => void;
  setCurrentTrack?: (track: PlayTrack | null) => void;
  setPaused?: (paused: boolean) => void;
}

// spotifySDK 초기화 함수
export const spotifySDKSetting = ({
  accessToken,
  setDeviceId,
  setCurrentTrack = () => {},
  setPaused = () => {},
}: SpotifySDKProps) => {
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  document.body.appendChild(script);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: 'Web Playback SDK',
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
      volume: 0.5,
    });

    player.addListener('ready', ({ device_id }) => {
      setDeviceId(device_id);
    });

    player.addListener('player_state_changed', (state) => {
      if (!state) return;
      setCurrentTrack(state.track_window.current_track);
      setPaused(state.paused);
    });

    player.connect();
  };

  return () => {
    document.body.removeChild(script);
  };
};

/**
 * 노래 재생
 * @param uri
 * @param accessToken
 * @param deviceId
 */
export const playTrack = async (
  uri: string,
  accessToken: string,
  deviceId: string,
) => {
  if (!accessToken && !deviceId) return;
  // 플레이할 디바이스 설정
  await fetch(`https://api.spotify.com/v1/me/player`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      device_ids: [deviceId],
      play: true,
    }),
  });

  // 현재 트랙 재생
  fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ uris: [uri] }),
  });
};

/**
 * 노래 멈추기
 * @param accessToken
 */
export const pauseTrack = async (accessToken: string) => {
  if (!accessToken) return;
  try {
    await fetch(`https://api.spotify.com/v1/me/player/pause`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error pausing track:', error);
  }
};

/**
 * 다음 노래 재생
 * @param accessToken
 */
export const nextTrack = async (accessToken: string) => {
  if (!accessToken) return;
  try {
    await fetch(`https://api.spotify.com/v1/me/player/next`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error skipping to next track:', error);
  }
};

/**
 * 이전 노래 재생
 * @param accessToken
 */
export const previousTrack = async (accessToken: string) => {
  if (!accessToken) return;
  try {
    await fetch(`https://api.spotify.com/v1/me/player/previous`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error skipping to previous track:', error);
  }
};

/**
 * 랜덤한 노래 재생
 * @param accessToken
 * @param deviceId
 */
export const RandomPlayTrack = async (
  accessToken: string,
  deviceId: string,
) => {
  if (!accessToken && !deviceId) return;

  const playlists = await api.playlist.getPlaylists('4cRo44TavIHN54w46OqRVc');

  const tracks = playlists?.tracks.items.map((item) => item.track);
  const currentTrackUri = tracks?.map((item) => item.uri);

  const getRandomTrack = (uris: string[]) => {
    const randomIndex = Math.floor(Math.random() * uris.length);
    return uris[randomIndex];
  };

  if (!currentTrackUri) return;

  const randomUri = getRandomTrack(currentTrackUri);

  await playTrack(randomUri, accessToken, deviceId);
};
