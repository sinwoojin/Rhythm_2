import { Artist, artistAlbum, artistTopMusic } from '@/schema/type';
import { getAccessToken } from './getToken';
import { spotifyAPI } from './spotifyApi';

/**
 * 아티스트 가져오기
 * @param getArtists
 */
const getArtist = async (artistsId: string): Promise<Artist | undefined> => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    const response = await spotifyAPI.get(`artists/${artistsId}`, {
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
 * 아티스트 인기곡 가져오기
 * @param getArtists
 */
const getTopArtistMusic = async (
  artistsId: string,
): Promise<artistTopMusic | undefined> => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    const response = await spotifyAPI.get(`artists/${artistsId}/top-tracks`, {
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
 * 아티스트 앨범 가져오기
 * @param artistsId
 * @returns
 */
const getArtistAlbum = async (
  artistsId: string,
): Promise<artistAlbum | undefined> => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    const response = await spotifyAPI.get(`artists/${artistsId}/albums`, {
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

export const artistsApi = {
  getArtist,
  getTopArtistMusic,
  getArtistAlbum,
};
