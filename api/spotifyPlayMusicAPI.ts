import { toast } from 'react-toastify';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRefreshToken } from './getToken';
import { api, spotifyAPI } from './spotifyApi';

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
      const storedToken = localStorage.getItem('spotify_provider_token');
      const refreshToken = localStorage.getItem('spotify_refresh_token');

      if (storedToken) {
        try {
          if (storedToken) {
            await spotifyAPI.get(`me`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            setAccessToken(storedToken);
            return;
          }
        } catch (error: any) {
          if (error.response?.status === 401) {
            console.warn('Access Token이 만료되었습니다. 갱신 중...');
          }
        }
      }
      if (refreshToken) {
        try {
          const refresh_token = await getRefreshToken();
          if (refresh_token) {
            await spotifyAPI.get(`me`, {
              headers: { Authorization: `Bearer ${refresh_token}` },
            });
            setAccessToken(refresh_token);
            return;
          }
        } catch (error: any) {
          if (error.response?.status === 401) {
            console.warn('Access Token이 만료되었습니다. 갱신 중...');
          }
        }
      }

      // Access Token이 없거나 만료된 경우 Refresh Token으로 갱신
      if (refreshToken) {
        const newAccessToken = await getRefreshToken();
        if (newAccessToken) {
          setAccessToken(newAccessToken); // 새 토큰 설정
        }
      } else {
        console.error('Refresh Token이 없습니다. 재로그인이 필요합니다.');
        alert('로그인이 필요합니다.');
      }
    } catch (error) {
      console.error('Access Token 가져오기 오류:', error);
      toast.error(
        'Access Token을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.',
      );
    }
  }
};

/**
 * 노래 재생
 *
 * 조건별 id
 *
 * playlist play = playlistId
 *
 * album play = albumId
 *
 * track play = [trackId]
 * @param uri
 * @param accessToken
 * @param deviceId
 * @param index
 */
export const playTrack = async (
  uri: string | string[],
  accessToken: string,
  deviceId: string,
  index?: number,
  position_ms: number = 0,
) => {
  if (!accessToken || !deviceId) return;
  try {
    // 트랙 재생
    await spotifyAPI.put(
      `me/player/play`,
      typeof uri === 'string'
        ? {
            context_uri: uri,
            offset: index !== undefined ? { position: index } : undefined,
            position_ms,
          }
        : {
            uris: uri,
            position_ms,
          },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
        params: {
          device_id: deviceId,
        },
      },
    );
  } catch (error: any) {
    if (error.response) {
      toast.error('API 호출 중 오류 발생:', error.response.data);
      if (error.response.status === 401) {
        toast.error(
          'Unauthorized: Access Token이 만료되었거나 잘못되었습니다.',
        );
      }
    } else {
      toast.error('API 호출 중 네트워크 오류 발생:', error);
    }
  }
};

/**
 * 노래정지, 현재 재생위치 가져오기
 * @param accessToken
 * @returns {number}
 */
export const pauseTrack = async (accessToken: string) => {
  if (!accessToken) return 0;
  try {
    const response = await spotifyAPI.get('me/player', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const progress_ms = response.data.progress_ms || 0;

    await spotifyAPI.put(`me/player/pause`, undefined, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return progress_ms;
  } catch (error: any) {
    toast.error('Error pausing track:', error);
    return 0;
  }
};

/**
 * 멈춘곳부터 다시 재생
 * @param trackURI
 * @param accessToken
 * @param deviceId
 * @param index
 */
export const resumeTrackFromLastPosition = async (
  trackURI: string | string[],
  accessToken: string,
  deviceId: string,
  index?: number,
) => {
  const position_ms = await pauseTrack(accessToken);

  await playTrack(trackURI, accessToken, deviceId, index, position_ms);
};

/**
 * 다음 노래 재생
 * @param accessToken
 */
export const nextTrack = async (accessToken: string, deviceId: string) => {
  if (!accessToken) return;
  try {
    await spotifyAPI.post(`me/player/next`, undefined, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        device_id: deviceId,
      },
    });
  } catch (error: any) {
    toast.error('하나의 곡만을 재생할 때에는 스킵이 불가능합니다.', error);
  }
};

/**
 * 이전 노래 재생
 * @param accessToken
 */
export const previousTrack = async (accessToken: string) => {
  if (!accessToken) return;
  try {
    await spotifyAPI.post(`me/player/previous`, undefined, {
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
export const playRandomTrack = async (
  accessToken: string,
  deviceId: string,
  playlistId: string,
) => {
  if (!accessToken && !deviceId) return;

  const playlists = await api.playlist.getPlaylist(playlistId);

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

/**
 * Queue 불러오기
 * @param accessToken
 * @returns
 */
export const getUsersQueue = async (accessToken: string) => {
  if (!accessToken) return;
  try {
    const response = await spotifyAPI.get(`me/player/queue`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error skipping to next track:', error);
  }
};

/**
 * 최근 재생목록 가져오기
 * @param accessToken
 * @returns
 */
export const getRecentPlayedTracks = async (accessToken: string) => {
  if (!accessToken) return [];
  try {
    const response = await spotifyAPI.get(`me/player/recently-played`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 10,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('Error skipping to next track:', error);
  }
};

/**
 * 노래 반복재생 기능
 * @param accessToken string
 * @param repeatState 'track' | 'context' | 'off'
 * @returns
 */
export const setRepeatMusic = async (
  accessToken: string,
  repeatState: 'track' | 'context' | 'off',
) => {
  if (!accessToken) return;
  try {
    const response = await spotifyAPI.put(
      `me/player/repeat?state=${repeatState}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log('Repeat mode set successfully');
    return response.data;
  } catch (error) {
    console.error('Error setting repeat mode:', error);
  }
};

/**
 * 노래 셔플 기능
 *
 * 단일 트랙 재생에서는 불가
 * @param accessToken string
 * @param shuffleState boolean
 * @returns
 */
export const setShuffleMusic = async (
  accessToken: string,
  shuffleState: boolean,
) => {
  if (!accessToken) return;
  try {
    const response = await spotifyAPI.put(
      `me/player/shuffle?state=${shuffleState}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error setting shuffle state:', error);
  }
};
