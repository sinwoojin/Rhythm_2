/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
"use client";
import { api } from "@/api/spotifyApi";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SearchInput() {
  const router = useRouter();
  /*검색한 값 */
  const [searchInput, setSearchInput] = useState("");
  /*검색한 결과 */
  const [searchResults, setSearchResults] = useState({});

  /*검색한 결과(앨범,가수,플레이리스트,트랙)를 담기 useEffect할때 넣어줘야함 */
  const fetchItems = async () => {
    if (searchInput) {
      try {
        // 병렬로 API 호출 수행
        const [
          tracksResponse,
          albumsResponse,
          artistsResponse,
          playlistsResponse,
        ] = await Promise.all([
          api.searchItems.getTracks(searchInput),
          api.searchItems.getAlbums(searchInput),
          api.searchItems.getArtists(searchInput),
          api.searchItems.getPlaylists(searchInput),
        ]);

        //검색된 결과를 하나의 객체로 합침
        const response = {
          tracks: tracksResponse || [],
          albums: albumsResponse || [],
          artists: artistsResponse || [],
          playlists: playlistsResponse || [],
        };

        setSearchResults(response);
      } catch (error) {
        console.error("Error fetching search items:", error);
        /*검색한 값이 남아있지 않도록 빈 배열로 바꿔주기 */
        setSearchResults({});
      }
    } else {
      setSearchResults({}); // 검색어가 없을 때 결과 초기화
    }
  };

  useEffect(
    () => {
      const debounced = setTimeout(() => {
        /*검색한 내용의 따라 값 띄워주기  */
        fetchItems();
      }, 2000);
      return () => clearTimeout(debounced); // 이전 타임아웃 정리
    },
    /*searchInput(검색한 값)이 바뀔때마다 가져오는 값이 바뀔 수 있도록 */ [
      searchInput,
    ]
  );

  /*검색창을 눌렀을때 검색한 내용을 띄워주는 화면으로 바뀌도록 router.push를 해줌 */
  const handleFocusInput = () => {
    router.push(`/search?search=${encodeURIComponent(searchInput)}`);
  };
  return (
    <input
      type="text"
      className="py-[10px] pl-10 pr-9 text-base rounded-md max-w-full bg-white bg-opacity-15 outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-blue-500/50 focus:bg-opacity-20"
      placeholder="RHYTHM 검색"
      value={searchInput || ""}
      onChange={(e) => setSearchInput(e.target.value)}
      onFocus={handleFocusInput}
    />
  );
}

export default SearchInput;
