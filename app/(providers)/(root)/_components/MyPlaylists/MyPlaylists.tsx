'use client';
import { useAuthStore } from '@/zustand/authStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { MdMusicOff } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';
import { Swiper, SwiperSlide } from 'swiper/react';
import DeletePlayListButton from '../../my/playlists/_component/DeletePlayListButton/DeletePlayListButton';
import Page from '../Page/Page';
interface MyPlaylistsProps {
  location: string;
}
function MyPlaylists({ location }: MyPlaylistsProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const getMyPlaylists = useSpotifyStore((state) => state.getMyPlaylists);

  const { data: playlists } = useQuery({
    queryKey: ['myPlaylists'],
    queryFn: getMyPlaylists,
  });

  const myPlaylists = playlists?.items;
  if (!myPlaylists) return;
  if (location === 'my')
    return (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPlaylists?.map((myPlaylist) => (
          <li
            key={myPlaylist.id}
            className="bg-[#1c1c1c] rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <Link href={`/playlists/${myPlaylist.id}`} className="block">
              <div className="relative w-full h-48">
                {myPlaylist.images && myPlaylist.images.length > 0 ? (
                  <img
                    src={myPlaylist.images[0].url}
                    alt={myPlaylist.name}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex justify-center items-center">
                    <MdMusicOff className="w-10 h-10 text-white/70" />
                  </div>
                )}
              </div>
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold truncate">
                  {myPlaylist.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {myPlaylist.owner.display_name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  트랙 수: {myPlaylist.tracks.total}
                </p>
              </div>
            </Link>
            <div className="flex items-center justify-between px-4 py-2 bg-[#111]">
              {currentUser && currentUser.spotifyId ? (
                <DeletePlayListButton playlistId={myPlaylist.id} />
              ) : null}
              <button
                aria-label="옵션 버튼"
                className="text-xl text-white/50 hover:text-white"
              >
                <SlOptions />
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  if (location === 'profile')
    return (
      <div className="relative max-w-full">
        {myPlaylists.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={7}
            loop={false}
            className="overflow-hidden"
          >
            {myPlaylists.map((playlist) => (
              <SwiperSlide key={playlist.id}>
                <Link href={`/playlists/${playlist.id}`}>
                  {playlist.images?.length === 0 ? (
                    <div className="w-full aspect-square bg-slate-600 "></div>
                  ) : (
                    <div className="w-full aspect-square bg-slate-600 ">
                      <img
                        alt={playlist.name}
                        src={playlist.images?.[0].url}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-xl font-semibold line-clamp-1">
                    {playlist.name}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Page>플레이 리스트가 존재하지 않습니다</Page>
        )}
      </div>
    );
}

export default MyPlaylists;
