'use client';

import { api } from '@/api/spotifyApi';
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
      return await api.playMusic.getRecentPlayedTracks(String(accessToken)); // 유효한 결과 반환
    },
  });

  const uniqueRecentPlaylists = recentPlaylists.filter(
    (track, index, self) =>
      index === self.findIndex((t) => t.track.id === track.track.id),
  );

  return (
    <div className="py-5 fixed right-0 bottom-[116px] z-10 rounded-md bg-rhythmBlack border text-white border-white w-[400px] h-[300px] overflow-y-scroll">
      <div className="flex items-center justify-between mb-7">
        <h2 className="font-semibold text-2xl ml-4">최근 재생 목록</h2>
        <button
          onClick={handleClickCloseModal}
          aria-label="닫기"
          className="font-semibold text-2xl"
        >
          <IoClose />
        </button>
      </div>
      <ul>
        {uniqueRecentPlaylists.length > 0 ? (
          uniqueRecentPlaylists.map((track, index) => (
            <li key={nanoid()} className="p-5 hover:bg-white/[0.05]">
              <Link
                href={`/tracks/${track.track.id}`}
                className="flex gap-3 items-center"
              >
                <span className="min-w-[24px]">{index + 1}</span>
                <img
                  src={track.track.album.images[2].url}
                  alt={track.track.name}
                />
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
