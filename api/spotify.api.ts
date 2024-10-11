import axios from "axios";
import { AlbumAPI } from "./spotfiy.album.api";

export const spotifyAPI = axios.create({ baseURL: "https://api.spotify.com/v1/" });
export const spotifyUserApi = axios.create({baseURL: "https://api.spotify.com/v1/me/"})

export const api = {
    AlbumAPI,
}