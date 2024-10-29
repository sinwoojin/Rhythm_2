import { Track } from '@/schema/type';
import { getAccessToken } from './getToken';
import { spotifyAPI } from './spotifyApi';

/**
 * 트랙 가져오기(노래 하나)
 * @param trackId
 */
const getTrack = async (trackId: string): Promise<Track | undefined> => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    const response = await spotifyAPI.get<Track>(`tracks/${trackId}`, {
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
 * 트랙 가져오기 (노래 여러 개)
 * @param trackIds
 */
const getTracks = async (trackIds: string | string[]): Promise<Track[] | undefined> => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const response = await spotifyAPI.get(`tracks?ids=${trackIds}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답 데이터 출력
    return response.data.tracks;
  } catch (error: any) {
    console.error(
      'Error fetching multiple tracks:',
      error.response?.data || error.message,
    );
  }
};

export const tracksApi = {
  getTrack,
  getTracks,
};
