import { getAccessToken } from "@/axios/getAccessToken";
import { baseURL } from "./spotifyApi";

/**
 * 아티스트 가져오기
 * @param getArtists
 */
const getArtist = async () => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    const response = await baseURL.spotifyAPI.get("artists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답 데이터 출력
    return response.data;
  } catch (error) {
    console.error("Error fetching album information:", error);
  }
};

export const Artists = {
  getArtist,
};
