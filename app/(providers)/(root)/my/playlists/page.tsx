'use client';
import { useAuthStore } from '@/zustand/authStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { MdMusicOff } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';
import Page from '../../_components/Page/Page';
import CreatePlaylistToggle from './_component/_CreatePlaylistToggle/CreatePlaylistToggle';
import DeletePlayListButton from './_component/DeletePlayListButton/DeletePlayListButton';

function MyPlaylist() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const getMyPlaylists = useSpotifyStore((state) => state.getMyPlaylists);

  const { data: playlists } = useQuery({
    queryKey: ['myPlaylists'],
    queryFn: () => getMyPlaylists(),
  });

  const myPlaylists = playlists?.items;
  const order = (index: number) => index + 1;

  if (!playlists) {
    return <div>로딩 중...</div>;
  }

  return (
    <Page title="내 플레이리스트" isNav={true}>
      <div className="flex w-full gap-x-6 mb-10">
        <CreatePlaylistToggle />
      </div>
      <div>
        <ul>
          {myPlaylists?.map((myPlaylist, index) => (
            <li
              key={myPlaylist.id}
              className="flex h-20 px-4 py-[10px] w-full gap-4 items-center rounded-sm transition-all hover:bg-white/10"
            >
              <span className="flex flex-row-reverse max-w-4 items-center">
                {order(index)}
              </span>
              <div className="grid grid-cols-3 gap-4 w-full h-full">
                <div className="flex gap-4 items-center">
                  <Link href={`/playlists/${myPlaylist.id}`}>
                    <div className="w-16 h-16">
                      {myPlaylist.images && myPlaylist.images.length > 0 ? (
                        <img src={myPlaylist.images[0].url} alt="image" />
                      ) : (
                        <div className="w-full h-full bg-slate-600 flex justify-center items-center">
                          <MdMusicOff className="w-7 h-7" />
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="w-full text-xs">{myPlaylist.name}</div>
                  <div className="w-full text-white/50 flex">
                    {myPlaylist.owner.display_name}
                  </div>
                </div>
                <div className="w-full flex items-center">
                  트랙 수: {myPlaylist.tracks.total}
                </div>
              </div>
              {currentUser && currentUser.spotifyId ? (
                <DeletePlayListButton playlistId={myPlaylist.id} />
              ) : (
                <button disabled className="opacity-50 cursor-not-allowed">
                  삭제하기
                </button>
              )}
              <button aria-label="옵션 버튼" className="text-xl text-white/50">
                <SlOptions />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

export default MyPlaylist;
