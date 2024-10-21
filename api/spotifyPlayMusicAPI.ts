import { api } from './spotifyApi';

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
