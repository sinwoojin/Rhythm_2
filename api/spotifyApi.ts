import axios from "axios";
import getUserApi from "./getUser";
import { AlbumAPI } from "./spotifyAlbumApi";
import { Artists } from "./spotifyArtistsApi";
import { PlaylistAPI } from "./spotifyPlaylistApi";
import { searchItems } from "./spotifySearch";
import { Tracks } from "./spotifyTrackApi";


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
  Artists,
  Tracks,
  searchItems,
	getUserApi,
};
