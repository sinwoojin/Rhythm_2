import { getAccessToken } from "./getToken";
import { api, spotifyAPI } from "./spotifyApi";

/**
 * 플레이 리스트 만들기(userId 필요)
 * @param userId
 */
const createPlaylists = async (title: string, description: string) => {
  const user = await api.getUser.getUser();
  const userId = user?.id;
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }

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
        },
      }
    );

    // 응답 데이터 출력
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching album information:", error);
  }
};

export const userPlaylistApi = {
  createPlaylists,
};
