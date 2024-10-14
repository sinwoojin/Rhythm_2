import axios from "axios";

export async function refreshAccessToken(): Promise<string> {
  try {
    const response = await axios.post(
      "/api/refresh-token",
      {},
      { withCredentials: true }
    ); // 리프레시 토큰 요청m

    if (response.data.access_token) {
      console.log(response.data.access_token);
      return response.data.access_token;
    } else {
      throw new Error("리프레시 토큰으로 액세스 토큰을 발급받지 못했습니다.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        "리프레시 토큰 요청 중 오류가 발생했습니다: " + error.message
      );
    } else {
      throw new Error(
        "리프레시 토큰 요청 중 오류가 발생했습니다: 알 수 없는 오류입니다."
      );
    }
  }
}
