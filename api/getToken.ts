/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const scopes = 'playlist-modify-private playlist-modify-public';
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

/**
 * spotify에 동의를 구하는 url(spotify 계정으로 로그인 할 시 뜨는 동의 창 url)
 * @returns
 */
export const getAuthorizeUrl = () => {
  return `${SPOTIFY_AUTHORIZE_URL}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&scope=${encodeURIComponent(scopes)}`;
};

/**
 * 그냥 getAccessToken하는 것 (이게 있어야 spotify로 로그인 하지 않은 유저들도 페이지의 기능들을 조금 이용할 수 있음(검색 노래 찾기))
 * @returns
 */
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

// accessToken이 만료되었을때 다시 accessToken을 불러오는 것

export const getRefreshToken = async (refreshToken: string | undefined) => {
  if (!refreshToken) {
    console.error('Refresh token이 없습니다. 다시 로그인해 주세요.');
    alert('로그인이 필요합니다.'); // 로그인 유도
    return;
  }

  try {
    const response = await axios.post(
      SPOTIFY_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error: any) {
    console.error('Refresh token을 가져오는 중 오류 발생:', error);

    // 401에러나 403에러일때 경고문 띄어주기
    if (error.response && [401, 403].includes(error.response.status)) {
      alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
    }

    return;
  }
};
