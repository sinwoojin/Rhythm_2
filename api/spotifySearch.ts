/* eslint-disable prefer-const */
import { getAccessToken } from "@/axios/getAccessToken";
import { baseURL } from "./spotifyApi";
/**
 * 검색한 값에 대한 트랙 가져오기
 * @param searchQuery
 * @returns
 */
const getTracks = async (searchQuery: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    let response = await baseURL.spotifySearchApi.get(
      `?q=${searchQuery}&type=track&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
/**
 * 검색한 값에 대한 앨범 가져오기
 * @param searchQuery
 * @returns
 */
const getAlbums = async (searchQuery: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    let response = await baseURL.spotifySearchApi.get(
      `?q=${searchQuery}&type=album&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
/**
 * 검색한 값에 대한 아티스트 가져오기
 * @param searchQuery
 * @returns
 */
const getArtists = async (searchQuery: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    let response = await baseURL.spotifySearchApi.get(
      `?q=${searchQuery}&type=artist&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
/**
 * 검색한 값에 대한 플레이 리스트 가져오기
 * @param searchQuery
 * @returns
 */
const getPlaylists = async (searchQuery: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    let response = await baseURL.spotifySearchApi.get(
      `?q=${searchQuery}&type=playlist&limit=15`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchItems = {
  getTracks,
  getAlbums,
  getArtists,
  getPlaylists,
};
