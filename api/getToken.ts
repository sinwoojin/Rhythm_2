import axios from 'axios';

const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const scopes = 'playlist-modify-private playlist-modify-public';
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

export const getAuthorizeUrl = () => {
  return `${SPOTIFY_AUTHORIZE_URL}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&scope=${encodeURIComponent(scopes)}`;
};

export const getAccessToken = async () => {
  const response = await axios.post(
    SPOTIFY_TOKEN_URL,
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  const { access_token } = response.data;
  return access_token;
};

// POST로 accessToken 불러오는 함수
export const getAuthAccessToken = async (code: string) => {
  try {
    const response = await axios.post(
      SPOTIFY_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error('Access Token 요청 중 오류 발생:', error);
    throw new Error('Access Token을 가져오는 데 실패했습니다.');
  }
};

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post(
      SPOTIFY_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken!,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    const { access_token, refresh_token: newRefreshToken } = response.data;
    localStorage.setItem('access_token', access_token);

    if (newRefreshToken) {
      localStorage.setItem('refresh_token', newRefreshToken);
    }

    return access_token;
  } catch (error) {
    console.error('Refresh token을 가져오는 중 오류 발생:', error);
    throw new Error('Refresh token을 가져오는 데 실패했습니다.');
  }
};
