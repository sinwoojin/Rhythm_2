import axios from "axios";
import { getRefreshToken } from "./getRefreshToken";

const BASEURL = "https://accounts.spotify.com/api/token";
const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

// POST로 accessToken 불러오는 함수
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      BASEURL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // access_token이 정의되어 있는지 확인하고 반환
    if (response.data.access_token) {
      return response.data.access_token;
    } else {
      const newToken = await getRefreshToken();
      return newToken;
    }
  } catch (error) {
    console.error("액세스 토큰 패치 오류:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
  }
};
