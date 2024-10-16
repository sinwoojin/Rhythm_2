"use client";
import { api } from "@/api/spotifyApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Page from "../_components/_Page/Page";

function SearchPage() {
  /* input에 검색한 내용을 받아오는 코드 */
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  /*검색한 결과 */
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    albums: [],
    artists: [],
    playlists: [],
  });

  /*검색한 결과(앨범,가수,플레이리스트,트랙)를 담기 useEffect할때 넣어줘야함 */
  const fetchItems = async () => {
    if (search) {
      try {
        // 병렬로 API 호출 수행
        const [
          tracksResponse,
          albumsResponse,
          artistsResponse,
          playlistsResponse,
        ] = await Promise.all([
          api.searchItems.getTracks(search),
          api.searchItems.getAlbums(search),
          api.searchItems.getArtists(search),
          api.searchItems.getPlaylists(search),
        ]);

        //검색된 결과를 하나의 객체로 합침
        const response = {
          tracks: tracksResponse?.tracks?.items || [],
          albums: albumsResponse?.albums?.items || [],
          artists: artistsResponse?.artists?.items || [],
          playlists: playlistsResponse?.playlists?.items || [],
        };
        setSearchResults(response);
      } catch (error) {
        console.error("Error fetching search items:", error);
        /*검색한 값이 남아있지 않도록 빈 배열로 바꿔주기 */
        setSearchResults({
          tracks: [],
          albums: [],
          artists: [],
          playlists: [],
        });
      }
    } else {
      setSearchResults({
        tracks: [],
        albums: [],
        artists: [],
        playlists: [],
      }); // 검색어가 없을 때 결과 초기화
    }
  };

  useEffect(
    () => {
      const debounced = setTimeout(() => {
        /*검색한 내용의 따라 값 띄워주기  */
        fetchItems();
      });
      return () => clearTimeout(debounced); // 이전 타임아웃 정리
    },
    /*searchInput(검색한 값)이 바뀔때마다 가져오는 값이 바뀔 수 있도록 */
    [search]
  );

  /*가져올때 전부 합쳐서 가져와서 사용하기 쉽게 바꿔놓은 것 */
  const track = searchResults.tracks;
  const album = searchResults.albums;
  const playlists = searchResults.playlists;
  const artists = searchResults.artists;

  console.log(playlists);

  return (
    <Page>
      검색
      <section className="flex">
        <div>
          <h2>노래</h2>
          <ul>
            {track.map((track) => (
              <li key={track.id}>
                <img src={track.album.images[0].url} />
                <p>{track.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>앨범</h2>
          <ul>
            {album.map((album) => (
              <li key={album.id}>
                <img src={album.images[0].url} />
                <p>{album.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>아티스트</h2>
          <ul>
            {artists.map((artists) => (
              <li key={artists.id}>
                <img src={artists.images[0].url} />
                <p>{artists.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>플레이 리스트</h2>
          <ul>
            {playlists.map((playlists) => (
              <li key={playlists.id}>
                <img src={playlists.images[0].url} />
                <p>{playlists.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Page>
  );
}

export default SearchPage;
