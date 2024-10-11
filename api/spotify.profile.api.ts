import { getAccessToken } from "@/axios/getAccessToken";
import { baseURL } from "./spotify.api";

/**
 * 지금 로그인한 유저의 프로필 가져오기
 * @param playlistId
 */
const getProfile = async () => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    const response = await baseURL.spotifyAPI.get("me", {
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
export const ProfileAPI = {
  getProfile,
};
