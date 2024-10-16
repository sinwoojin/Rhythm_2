import axios from "axios";
import getUserApi from "./getUser";
import { AlbumAPI } from "./spotifyAlbumApi";
import { Artists } from "./spotifyArtistsApi";
import { PlaylistAPI } from "./spotifyPlaylistApi";
import { searchItemsAPI } from "./spotifySearch";
import { TracksApi } from "./spotifyTrackApi";


const spotifyAPI = axios.create({ baseURL: "https://api.spotify.com/v1/" });

const spotifyUserAPI = axios.create({
	baseURL: "https://api.spotify.com/v1/users/",
});
const spotifyPlaylistApi = axios.create({
	baseURL: "https://api.spotify.com/v1/playlists",
});
const spotifyAlbumApi = axios.create({
	baseURL: "https://api.spotify.com/v1/albums",
});
const spotifyArtistApi = axios.create({
	baseURL: "https://api.spotify.com/v1/artists",
});
const spotifyTrackApi = axios.create({
	baseURL: "https://api.spotify.com/v1/tracks",
});
const spotifySearchApi = axios.create({
	baseURL: "https://api.spotify.com/v1/search",
});

export const baseURL = {
	spotifyAPI,
	spotifyUserAPI,
  spotifyPlaylistApi,
  spotifyAlbumApi,
  spotifyArtistApi,
  spotifyTrackApi,
  spotifySearchApi
};

export const api = {
  AlbumAPI,
  PlaylistAPI,
  Artists,
  TracksApi,
  searchItemsAPI,
	getUserApi,
};
