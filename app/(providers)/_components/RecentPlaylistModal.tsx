'use client';

import { getRecentPlayedTracks } from '@/api/spotifyPlayMusicAPI';
import { Album, Artist } from '@/schema/type';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';

export interface RecentPlayedItem {
  track: {
    artists: Artist[];
    album: Album;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    href: string;
    id: string;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    uri: string;
  };

  played_at: string; // 재생 시간
  context: null; // 현재 컨텍스트는 null로 고정
}

function RecentPlaylistModal() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleClickCloseModal = () => {
    closeModal();
  };

  const { data: recentPlaylists = [] } = useQuery<RecentPlayedItem[]>({
    queryKey: ['recentPlay', currentUser?.id],
    queryFn: async () => {
      return await getRecentPlayedTracks(String(accessToken)); // 유효한 결과 반환
    },
  });

  console.log(recentPlaylists);

  return (
    <div className="p-5 fixed right-0 bottom-[116px] z-10 bg-blue-100 w-[400px] h-[300px] overflow-scroll">
      <div className="flex items-center justify-between mb-7">
        <h2 className="font-semibold text-2xl">최근 재생 목록</h2>
        <button
          onClick={handleClickCloseModal}
          aria-label="닫기"
          className="font-semibold text-2xl"
        >
          <IoClose />
        </button>
      </div>
      <ul>
        {recentPlaylists.length > 0 ? (
          recentPlaylists.map((track, index) => (
            <li key={nanoid()}>
              <Link
                href={`/music/${track.track.id}`}
                className="flex gap-3 mb-5 items-center"
              >
                <span className="min-w-[24px]">{index + 1}</span>
                <img src={track.track.album.images[2].url} alt="" />
                <p className="line-clamp-1">{track.track.name} | </p>
                <p>
                  {track.track.artists.map((artist) => artist.name).join(', ')}
                </p>
              </Link>
            </li>
          ))
        ) : (
          <li>최근 재생목록이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default RecentPlaylistModal;
