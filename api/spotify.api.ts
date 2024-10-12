import axios from "axios";
import { AlbumAPI } from "./spotify.album.api";
import { PlaylistAPI } from "./spotify.playlist.api";
import { ProfileAPI } from "./spotify.profile.api";

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
