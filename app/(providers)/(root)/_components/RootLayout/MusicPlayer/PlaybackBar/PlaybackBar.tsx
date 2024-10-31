'use client';
import { PlaybackState } from '@/schema/type';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useEffect, useRef, useState } from 'react';

const Player = () => {
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(
    null,
  );
  const [currentProgress, setCurrentProgress] = useState(0);
  const getPlayBackState = useSpotifyStore((state) => state.getPlayBackState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playingRef = useRef<boolean>(false);

  const fetchPlaybackState = async () => {
    try {
      const state = await getPlayBackState();
      setPlaybackState(state);
      setCurrentProgress(state?.progress_ms || 0);
      playingRef.current = state?.is_playing || false;
    } catch (error) {
      console.error('재생 상태를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (playbackState?.is_playing) {
      fetchPlaybackState();
    }
    intervalRef.current = setInterval(() => {
      fetchPlaybackState();
    }, 5000);
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [playbackState?.is_playing]);

  if (!playbackState) {
    return (
      <div className=" w-full h-1 bg-gray-600 rounded-full overflow-hidden">
        <div className=" top-0 left-0 h-full" style={{ width: '0%' }} />
      </div>
    );
  }
  const duration_ms = playbackState.item.duration_ms;
  const progressPercent = (currentProgress / duration_ms) * 100;

  return (
    <div className=" w-full h-1 bg-gray-600 rounded-full overflow-hidden">
      <div
        className=" top-0 left-0 h-full bg-red-500 transition-all"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
};

export default Player;
