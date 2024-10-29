'use client';
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

  const { data: tracks } = useQuery({
    queryKey: ['userLikeTracks', userId],
    queryFn: () => supabaseProfile.getMyLikeTracks(userId),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['userLikeTracks', userId],
    });
  }, [currentUser]);

  return profileId === userId ? (
    <div>
      <ul className="flex gap-x-5">
        {tracks?.map(async (track) => (
          <li key={track.trackId}>
            <Link href={`/music/${track.trackId}`}>
              <p>{track.trackId}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}

export default MyLikeTracks;
