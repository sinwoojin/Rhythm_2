import { getAccessToken } from "@/axios/getAccessToken";

import { Album } from "@/schema/type";
import { baseURL } from "./spotifyApi";


/**
 * 앨범 받아오기(albumId 필요함)
 * @param albumId
 */
const getAlbum = async (albumId: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }

    const response = await baseURL.spotifyAPI.get<Album[]>(`albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답 데이터 출력
    return response.data
  } catch (error) {
    console.error("Error fetching album information:", error);
  }
};
/**
 * 여러 앨범 받아오기(albumIds 필요함 (예:albumId, albumId))
 * @param albumIds
 */
const getAlbums = async (albumIds: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }

    const response = await baseURL.spotifyAPI.get(`albums?${albumIds}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답 데이터 출력
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching album information:", error);
  }
};
/**
 * 앨범 트랙 받아오기(albumId 필요함)
 * @param albumId
 */
const getAlbumTrack = async (albumId: string) => {
  try {
    const accessToken = await getAccessToken(); // 액세스 토큰을 비동기로 가져옴
    if (!accessToken) {
      throw new Error("Access token is required");
    }

    const response = await baseURL.spotifyAPI.get(`albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답 데이터 출력
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching album information:", error);
  }
};

export const AlbumAPI = {
    getAlbum,
    getAlbums,
    getAlbumTrack
}