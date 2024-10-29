import { Playlist, UserPlaylist } from '@/schema/type';
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

/**
 * 유저 플레이 리스트 받아오기(accessToken 필요)
 * @param playlistId
 */
const getMyPlaylists = async (
  accessToken: string,
): Promise<UserPlaylist | undefined> => {
  try {
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const response = await spotifyAPI.get<UserPlaylist>(`me/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답 데이터 출력
    return response.data;
  } catch (error) {
    console.error('Error fetching album information:', error);
  }
};

/**
 * 플레이 리스트 삭제하는 api
 * @param playlistId
 */
const deleteMyPlaylists = async (
  accessToken: string | null,
  playlistId: string,
) => {
  try {
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    const response = await spotifyAPI.delete(
      `playlists/${playlistId}/followers`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // 성공적으로 삭제되면 204가 됨
    if (response.status === 204) {
      return '플레이 리스트가 성공적으로 삭제됨.';
    }

    return response.data;
  } catch (error) {
    console.error('플레이 리스트 삭제하는데 에러가 남:', error);
    throw new Error('플레이 리스트 삭제 실패.');
  }
};

export const playlistApi = {
  getPlaylist,
  getMyPlaylists,
  deleteMyPlaylists,
};
