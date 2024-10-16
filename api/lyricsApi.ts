import { getAccessToken } from "@/axios/getAccessToken";
import axios from "axios";
import { baseURL } from "./spotifyApi";

const fetchSpotifyTrack = async (trackId: string) => {
	const accessToken = await getAccessToken(); // Spotify API 인증 토큰

	try {
		const response = await baseURL.spotifyAPI.get(`tracks/${trackId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const trackData = response.data;
		return {
			title: trackData.name,
			artist: trackData.artists[0].name, // 첫 번째 아티스트 이름
		};
	} catch (error) {
		console.error("Spotify API 요청 실패:", error);
	}
};

const fetchLyricsFromGenius = async (trackTitle: string, artist: string) => {
	const accessToken = await getAccessToken(); // Genius API 인증 토큰
	const query = `${trackTitle} ${artist}`;

	try {
		const response = await axios.get(
			`https://api.genius.com/search?q=${encodeURIComponent(query)}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const hits = response.data.response.hits;
		if (hits.length > 0) {
			const song = hits[0].result;
			return song.url; // Genius 가사 웹 페이지 URL
		} else {
			return null;
		}
	} catch (error) {
		console.error("Genius API 요청 실패:", error);
	}
};

/**
 *
 * @param trackId string props로 받아온 값
 * @returns
 */
const getSpotifyLyrics = async (trackId: string) => {
	try {
		// 1. Spotify에서 트랙 정보 가져오기
		const trackInfo = await fetchSpotifyTrack(trackId);

		if (trackInfo) {
			// 2. Genius에서 가사 검색하기
			const lyricsUrl = await fetchLyricsFromGenius(
				trackInfo.title,
				trackInfo.artist
			);

			if (lyricsUrl) {
				return lyricsUrl;
			} else {
				console.log("가사를 찾을 수 없습니다.");
			}
		}
	} catch (error) {
		console.error("가사 검색 실패:", error);
	}
};

export const lyricsApi = {
	getSpotifyLyrics,
};
