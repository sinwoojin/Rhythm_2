import axios from "axios";
import { AlbumAPI } from "./spotifyAlbumApi";
import { PlaylistAPI } from "./spotifyPlaylistApi";
import { ProfileAPI } from "./spotifyProfileApi";


const spotifyAPI = axios.create({ baseURL: "https://api.spotify.com/v1/" });
const spotifyPlayListAPI = axios.create({
  baseURL: "https://api.spotify.com/v1/users/",
});

export const baseURL = {
  spotifyAPI,
  spotifyPlayListAPI,
};

export const api = {
  AlbumAPI,
  PlaylistAPI,
  ProfileAPI
};
