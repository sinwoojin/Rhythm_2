'use client';

import { api } from '@/api/spotifyApi';
import { useQuery } from '@tanstack/react-query';

interface TrackDetailLyricProps {
  trackId: string;
}

function TrackDetailLyric({ trackId }: TrackDetailLyricProps) {
  const { isLoading, data: lyric } = useQuery({
    queryKey: ['lyric', { trackId }],
    queryFn: () => api.lyrics.getTrackLyricOnClient(trackId),
  });

  return (
    <div className="pb-9 ">
      <h2 className="mb-5 text-3xl font-bold">가사</h2>
      <p className="whitespace-pre-wrap break-words break-all  text-base">
        {isLoading ? '가사를 불러오는 중입니다...' : lyric}
      </p>
    </div>
  );
}

export default TrackDetailLyric;
