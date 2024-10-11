import { getAccessToken } from "@/axios/getAccessToken";
import { spotifyAPI } from "./spotify.api";

/**
 * 플레이 리스트 받아오기
 * @param playlistId
 */
const getPlaylists = async (playlistId: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }

    const response = await spotifyAPI.get(`playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답 데이터 출력
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching album information:", error);
  }
};

export const PlaylistAPI = {
  getPlaylists,
};
