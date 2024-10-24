'use client';
import { supabaseProfile } from '@/api/supabaseProfile';
import { useAuthStore } from '@/zustand/authStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';

function MyLikeTracks() {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = String(currentUser?.id);

  const { data: tracks } = useQuery({
    queryKey: ['userLikeTracks', userId],
    queryFn: () => supabaseProfile.getMyLikeTracks(userId),
  });

  const tracksId = tracks?.map((track) => track.trackId);

  console.log('tracksId', tracksId);

  useEffect(() => {
    (async () => {
      queryClient.invalidateQueries({
        queryKey: ['userLikeTracks', userId],
      });
    })();
  }, [currentUser]);

  return (
    <div>
      <ul>
        {tracks?.map((track) => (
          <li key={track.trackId}>
            <Link href={`/music/${track.trackId}`}>
              <p>{track.trackId}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyLikeTracks;
