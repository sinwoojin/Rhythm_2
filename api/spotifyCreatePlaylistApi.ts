/* eslint-disable @typescript-eslint/no-explicit-any */
import { api, spotifyAPI } from "./spotifyApi";

/**
 * 플레이리스트 생성 함수 (userId 필요)
 * @param title - 플레이리스트 제목
 * @param description - 플레이리스트 설명
 */
const createPlaylists = async (
  title: string,
  description: string,
  accessToken: string
) => {
  try {
    // 사용자 정보 가져오기
    const user = await api.getUser.getUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("사용자 ID를 찾을 수 없습니다.");
    }

    // Spotify API에 플레이리스트 생성 요청
    const response = await spotifyAPI.post(
      `users/${userId}/playlists`,
      {
        name: title,
        description: description,
        public: false,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("플레이리스트 생성 성공:", response.data);
    return response.data;
  } catch (error: any) {
    // 에러 메시지를 명확히 출력
    console.error(
      `플레이리스트 생성 중 오류 발생: ${
        error.response?.data?.error?.message || error.message
      }`
    );
    throw error; // 에러를 다시 던져 상위에서 처리하도록 합니다.
  }
};

export const userPlaylistApi = {
  createPlaylists,
};
