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

  const fetchPlaybackState = async () => {
    try {
      const state = await getPlayBackState();
      setPlaybackState(state);
      setCurrentProgress(state?.progress_ms || 0); // 초기 진행률 설정
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
    if (playbackState?.is_playing) {
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= playbackState.item.duration_ms) {
            clearInterval(interval);
            return playbackState.item.duration_ms;
          }
          return prev + 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [playbackState]);

  if (!playbackState) return <p>Loading...</p>;

  const { item, is_playing } = playbackState;
  const duration_ms = item.duration_ms;

  const progressPercent = (currentProgress / duration_ms) * 100;

  return (
    <div className="text-white">
      {/* 진행 바 */}
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <p>{is_playing ? '재생 중' : '일시 정지됨'}</p>
    </div>
  );
};

export default Player;
