import axios from "axios";
import getUserApi from "./getUser";
import { lyricsApi } from "./lyricsApi";
import { albumApi } from "./spotifyAlbumApi";
import { artistsApi } from "./spotifyArtistsApi";
import { userPlaylistApi } from "./spotifyCreatePlaylistApi";
import { playlistApi } from "./spotifyPlaylistApi";
import { searchItemsApi } from "./spotifySearch";
import { tracksApi } from "./spotifyTrackApi";

export const spotifyAPI = axios.create({
	baseURL: "https://api.spotify.com/v1/",
});
export const api = {
	album: albumApi,
	playlist: playlistApi,
	artist: artistsApi,
	track: tracksApi,
	search: searchItemsApi,
	getUser: getUserApi,
	userPlay: userPlaylistApi,
	genius: lyricsApi,
};
