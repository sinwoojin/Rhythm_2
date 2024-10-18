import axios from "axios";
import * as cheerio from "cheerio";
import { getAccessToken } from "./getToken";
import { spotifyAPI } from "./spotifyApi";

const fetchSpotifyTrack = async (trackId: string) => {
	const accessToken = await getAccessToken(); // Spotify API 인증 토큰

	try {
		const response = await spotifyAPI.get(`tracks/${trackId}`, {
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
	const accessToken = process.env.NEXT_PUBLIC_GENIUS_CLIENT_TOKEN; // Genius API 인증 토큰
	const query = `${trackTitle} ${artist}`;
	const baseUrl = "https://api.genius.com";

	try {
		const response = await axios.get(
			baseUrl + `/search?q=${encodeURIComponent(query)}`,
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
const getSpotifyLyricsUrl = async (trackId: string) => {
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

/**
 *
 * @param lyricsUrl
 * @returns Genius 가사 페이지에서 가사를 추출
 */
const scrapeLyricsFromGenius = async (
	lyricsUrl: string
): Promise<string | null> => {
	try {
		const response = await axios.get(lyricsUrl);
		const html = response.data;

		const $ = cheerio.load(html);

		const lyrics =
			$(".lyrics").text() || $("[data-lyrics-container]").text();

		if (lyrics) {
			return lyrics.trim();
		}

		return null;
	} catch (error) {
		console.error("Genius 가사 스크래핑 실패:", error);
		return null;
	}
};

export const lyricsApi = {
	getSpotifyLyricsUrl,
	scrapeLyricsFromGenius,
};
