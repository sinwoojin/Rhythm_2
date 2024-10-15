/* eslint-disable prefer-const */
import { getAccessToken } from "@/axios/getAccessToken";
import { baseURL } from "./spotifyApi";

const getTracks = async (searchQuery: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    let response = await baseURL.spotifyAPI.get(
      `search?q=${searchQuery}&type=track&limit=20`,
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
const getAlbums = async (searchQuery: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    let response = await baseURL.spotifyAPI.get(
      `search?q=${searchQuery}&type=album&limit=20`,
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
const getArtists = async (searchQuery: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    let response = await baseURL.spotifyAPI.get(
      `search?q=${searchQuery}&type=artist&limit=10`,
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
const getPlaylists = async (searchQuery: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    let response = await baseURL.spotifyAPI.get(
      `search?q=${searchQuery}&type=playlist&limit=15`,
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
