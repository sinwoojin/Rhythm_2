'use client';
import { api } from '@/api/spotifyApi';
import { supabaseProfile } from '@/api/supabaseProfile';
import { useAuthStore } from '@/zustand/authStore';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';

interface MyLikeTracksProps {
  profileId: string;
}

function MyLikeTracks({ profileId }: MyLikeTracksProps) {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = String(currentUser?.id);

  const { data: myLikeTracks, isLoading: loadingMyLikeTracks } = useQuery({
    queryKey: ['userLikeTracks', userId],
    queryFn: () => supabaseProfile.getMyLikeTracks(userId),
    placeholderData: keepPreviousData,
  });

  // 좋아요 표시한 트랙 뿌리기
  const { data: tracks, isLoading: loadingTracks } = useQuery({
    queryKey: ['tracks', userId],
    queryFn: async () => {
      const trackIds = myLikeTracks?.map((item) => item.trackId);
      if (!trackIds) return [];
      return api.track.getTracks(trackIds);
    },
    enabled: !!myLikeTracks,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['tracks', userId],
    });
  }, [currentUser, queryClient, userId]);

  // 로딩 중일 때 스피너 표시
  if (loadingMyLikeTracks || loadingTracks) {
    return <div className="text-center">로딩 중...</div>;
  }

  return profileId === userId ? (
    <div>
      <ul className="flex gap-x-5">
        {tracks?.map((track) => (
          <li key={track.id}>
            <Link href={`/tracks/${track.id}`}>
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="w-[165px] h-[165px]"
              />
              <p className="w-[160px] truncate">{track.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}

export default MyLikeTracks;
