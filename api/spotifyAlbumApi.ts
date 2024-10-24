import { Album } from '@/schema/type';
import { getAccessToken } from './getToken';
import { spotifyAPI } from './spotifyApi';

/**
 * 앨범 받아오기(albumId 필요함)
 * @param albumId
 */
const getAlbum = async (albumId: string): Promise<Album | undefined> => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const response = await spotifyAPI.get<Album>(`albums/${albumId}`, {
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

export const albumApi = {
  getAlbum,
};
