import axios from 'axios';
import getUserApi from './getUser';
import { lyricsApi } from './lyricsApi';
import { albumApi } from './spotifyAlbumApi';
import { artistsApi } from './spotifyArtistsApi';
import { categoriesApi } from './spotifyCategoriesApi';
import { playlistApi } from './spotifyPlaylistApi';
import { playMusic } from './spotifyPlayMusicAPI';
import { searchItemsApi } from './spotifySearch';
import { tracksApi } from './spotifyTrackApi';
import { userPlaylistApi } from './spotifyUserPlaylist';

export const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});
export const api = {
  album: albumApi,
  playlist: playlistApi,
  artist: artistsApi,
  track: tracksApi,
  search: searchItemsApi,
  getUser: getUserApi,
  userPlay: userPlaylistApi,
  lyrics: lyricsApi,
  category: categoriesApi,
  playMusic: playMusic,
};
