import axios from "axios";
import getUserApi from "./getUser";
import { AlbumAPI } from "./spotifyAlbumApi";
import { PlaylistAPI } from "./spotifyPlaylistApi";
import { ProfileAPI } from "./spotifyProfileApi";

const spotifyAPI = axios.create({ baseURL: "https://api.spotify.com/v1/" });
const spotifyUserAPI = axios.create({
	baseURL: "https://api.spotify.com/v1/users/",
});

export const baseURL = {
	spotifyAPI,
	spotifyUserAPI,
};

export const api = {
	AlbumAPI,
	PlaylistAPI,
	ProfileAPI,
	getUserApi,
};
