import axios, { AxiosResponse } from 'axios';

// Spotify 토큰 엔드포인트 URI 및 클라이언트 자격 증명 설정
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const clientId = process.env.SPOTIFY_CLIENT_ID!
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!

// 요청할 데이터 타입 정의
interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

// POST 요청 함수 정의
export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const response: AxiosResponse<TokenResponse> = await axios.post(
      tokenEndpoint,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token
  } catch (error) {
    console.error('액세스 토큰 패치 오류:', error);
  }

};
