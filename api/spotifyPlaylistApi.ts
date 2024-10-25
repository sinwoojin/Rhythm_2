import { Playlist } from '@/schema/type';
import { getAccessToken } from './getToken';
import { spotifyAPI } from './spotifyApi';

/**
 * 플레이 리스트 받아오기(playlistId 필요)
 * @param playlistId
 */
const getPlaylist = async (
  playlistId: string,
): Promise<Playlist | undefined> => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const response = await spotifyAPI.get<Playlist>(`playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // 응답 데이터 출력
    return response.data;
  } catch (error) {
    console.error('Error fetching album information:', error);
  }
};

export const playlistApi = {
  getPlaylist,
};
