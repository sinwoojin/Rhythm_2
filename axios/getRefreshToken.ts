import axios from "axios";

export const getRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const BASEURL = "https://accounts.spotify.com/api/token";

    const response = await axios.post(
      BASEURL,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken as string,
        client_id: process.env.SPOTIFY_CLIENT_ID as string,
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
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // 필요에 따라 사용자에게 알림을 띄우거나 추가 처리 수행
  }
};
