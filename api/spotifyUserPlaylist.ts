/* eslint-disable @typescript-eslint/no-explicit-any */
import { spotifyAPI } from './spotifyApi';

/**
 * 플레이리스트 생성 함수 (userId 필요)
 * @param title - 플레이리스트 제목
 * @param description - 플레이리스트 설명
 */
const createPlaylists = async (
  title: string,
  description: string,
  Disclosure: boolean,
  spotifyUserId: string,
  accessToken: string,
) => {
  try {
    // Spotify API에 플레이리스트 생성 요청
    const response = await spotifyAPI.post(
      `users/${spotifyUserId}/playlists`,
      {
        name: title,
        description: description,
        public: Disclosure,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('플레이리스트 생성 성공:', response.data);
    return response.data;
  } catch (error: any) {
    // 에러 메시지를 명확히 출력
    console.error(
      `플레이리스트 생성 중 오류 발생: ${
        error.response?.data?.error?.message || error.message
      }`,
    );
    throw error;
  }
};

/**
 *플레이 리스트에 트랙을 추가하는 api
 * @param uri 트랙에 uri
 * @param accessToken 사용자의 accessToken
 * @param playlistId 사용자의 플레이 리스트 명
 * @returns
 */
const addTrackToPlaylists = async (
  accessToken: string,
  playlistId: string,
  uri: string,
) => {
  try {
    // Spotify API에 플레이리스트 생성 요청
    const response = await spotifyAPI.post(
      `playlists/${playlistId}/tracks`,
      {
        uris: [uri],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    // 에러 메시지를 명확히 출력
    console.error(
      `플레이 리스트에 노래 추가 중 에러 발생: ${
        error.response?.data?.error?.message || error.message
      }`,
    );
    throw error;
  }
};

/**
 *플레이 리스트에 트랙을 제거하는 api
 * @param uri 트랙에 uri
 * @param accessToken 사용자의 accessToken
 * @param playlistId 사용자의 플레이 리스트 명
 * @param snapshotId 플레이 리스트의 스냅샷 id(플레이 리스트 수정시 바뀔 수 있음)
 * @returns
 */
const deleteTrackToPlaylists = async (
  accessToken: string,
  playlistId: string,
  uri: string,
  snapshotId: string,
) => {
  try {
    // Spotify API에 플레이리스트 생성 요청
    const response = await spotifyAPI.delete(
      `playlists/${playlistId}/tracks`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          track: [
            {
              uri,
            },
          ],
          snapshot_id: snapshotId,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    // 에러 메시지를 명확히 출력
    console.error(
      `플레이 리스트에 노래 추가 중 에러 발생: ${
        error.response?.data?.error?.message || error.message
      }`,
    );
    throw error;
  }
};
export const userPlaylistApi = {
  createPlaylists,
  addTrackToPlaylists,
  deleteTrackToPlaylists,
};
