'use client';

import { api } from '@/api/spotifyApi';
import { supabaseProfile } from '@/api/supabaseProfile';
import LikeButton from '@/components/LikeButton';
import { useAuthStore } from '@/zustand/authStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { SlOptions } from 'react-icons/sl';
import Page from '../../_components/Page/Page';

function LikedMusics() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = String(currentUser?.id);

  const play = useSpotifyStore((state) => state.play);

  const queryClient = useQueryClient();

  const { data: myLikeTracks } = useQuery({
    queryKey: ['userLikeTracks', userId],
    queryFn: () => supabaseProfile.getMyLikeTracks(userId),
  });

  const tracksILikeIds = myLikeTracks?.map((item) => item.trackId) || [];

  // 좋아요 표시한 트랙 뿌리기
  const { data: tracks } = useQuery({
    queryKey: ['tracks', { userId, tracksILikeIds }],
    queryFn: async () => {
      if (!tracksILikeIds || tracksILikeIds.length === 0) return [];
      return api.track.getTracks(tracksILikeIds);
    },
    enabled: !!myLikeTracks,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['userLikeTracks', userId] });
    queryClient.invalidateQueries({ queryKey: ['tracks', userId] });
  }, [queryClient, userId]);

  return tracks?.length ? (
    <Page title="좋아요 한 노래" isNav={true}>
      <div>
        <ul>
          {tracks.map((track) => (
            <li
              key={track.id}
              className="flex gap-x-5 h-28 p-4 items-center transition-all duration-200 hover:bg-white/20"
            >
              <button
                onClick={() => play([track.uri])}
                className="bg-white/20 h-full aspect-square"
              >
                <div className="bg-black/20 w-full h-full relative group">
                  <FaPlay className="absolute z-10 text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 opacity-0 group-hover:opacity-100" />
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="absolute transition-all duration-200 group-hover:brightness-50"
                  />
                </div>
              </button>

              <div className="grid grid-cols-4 w-full">
                <span className="col-span-2 text-lg">
                  <Link
                    href={`/tracks/${track.id}`}
                    className="hover:underline"
                  >
                    {track.name}
                  </Link>
                </span>
                <span className="col-span-1 text-lg">
                  <Link
                    href="/해당 가수 정보 디테일 페이지로 이동"
                    className="hover:underline"
                  >
                    {track.artists[0].name}
                  </Link>
                </span>
                <span className="col-span-1 text-lg ml-auto flex items-center gap-x-5">
                <LikeButton trackId={track.id} hasBorder={true} />
                  <button aria-label="설정">
                    <SlOptions />
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  ) : (
    <Page title="좋아요 한 노래" isNav={true}>
      현재 좋아요 표시한 곡이 없습니다.
    </Page>
  );
}

export default LikedMusics;
