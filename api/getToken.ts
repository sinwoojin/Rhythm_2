import axios from "axios";

const BASEURL = "https://accounts.spotify.com/api/token";
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;

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

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  try {
    const response = await axios.post(
      BASEURL,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken as string,
        client_id: clientId as string,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token: newRefreshToken } = response.data;

    localStorage.setItem("access_token", access_token);
    if (newRefreshToken) {
      localStorage.setItem("refresh_token", newRefreshToken);
    }
    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // 필요에 따라 사용자에게 알림을 띄우거나 추가 처리 수행
  }
};
