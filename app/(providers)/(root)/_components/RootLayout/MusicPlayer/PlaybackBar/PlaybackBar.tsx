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
    fetchPlaybackState();
    intervalRef.current = setInterval(() => {
      fetchPlaybackState();
    }, 10000);

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playingRef.current) {
        setCurrentProgress((prev) => {
          if (playbackState && prev >= playbackState.item.duration_ms) {
            clearInterval(interval);
            return playbackState.item.duration_ms;
          }
          return prev + 1000;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playbackState]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!playbackState) {
    return (
      <div className="text-white flex w-full gap-x-3 justify-center text-center text-xs items-center">
        <span>0:00</span>
        <div className="relative w-[300px] h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-slate-400"
            style={{ width: '0%' }}
          />
        </div>
        <span>0:00</span>
      </div>
    );
  }

  const { item } = playbackState;
  const { duration_ms } = item;

  const progressPercent = (currentProgress / duration_ms) * 100;

  return (
    <div className="text-white flex w-full gap-x-3 justify-center text-center text-xs items-center">
      <span>{formatTime(currentProgress)}</span>

      <div className="relative w-[300px] h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-red-500 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <span>{formatTime(duration_ms)}</span>
    </div>
  );
};

export default Player;
