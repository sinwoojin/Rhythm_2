'use client';

import BigRedButton from '@/app/(providers)/(root)/_components/Layouts/_components/PlayButton/BigRedButton';
import WhiteSmallButton from '@/app/(providers)/(root)/_components/Layouts/_components/PlayButton/WhiteSmallButton';
import { Track } from '@/schema/type';
import useSpotifyStore, { SpotifyStoreState } from '@/zustand/spotifyStore';

type PlayButtonProps = {
  source: Parameters<SpotifyStoreState['play']>[0];
  trackInfo: { tracks: Track[]; index: number };
  type: 'bigRed' | 'smallWhite';
};

function PlayButton({ source, trackInfo, type }: PlayButtonProps) {
  const play = useSpotifyStore((state) => state.play);
  const currentTrack = useSpotifyStore((state) => state.currentTrack);
  const resume = useSpotifyStore((state) => state.pauseAndResumeTrack);
  const pause = useSpotifyStore((state) => state.pause);
  const isPaused = useSpotifyStore((state) => state.isPaused);
  const isPlayButtonOnCurrentTrack =
    currentTrack && trackInfo.tracks[trackInfo.index]?.id === currentTrack.id;
  const ButtonComponent = type === 'bigRed' ? BigRedButton : WhiteSmallButton;

  const handleClickPlayButton = () => {
    if (
      isPaused === true &&
      currentTrack &&
      trackInfo.tracks[trackInfo.index].id === currentTrack.id
    ) {
      resume(source.context, source.index);
    } else {
      play(source);
    }
  };

  // isPaused가 null일 수도 있기 때문에 반드시 `false`로 체크
  if (isPaused === false && isPlayButtonOnCurrentTrack) {
    return <ButtonComponent isPaused={false} onClick={pause} />;
  }

  // Case #1. currentTrack이 없거나
  // Case #2. currentTrack은 있으나(노래가 재생중이나), 이 버튼에 연결된 트랙이 아니거나
  // Case #3. currentTrack은 있고, 이 버튼에 연결된 트랙이
  // Case #3. currentTrack도 있고, 이 버튼에 연결된 트랙이지만 일시정지 상태이거나
  return <ButtonComponent isPaused onClick={handleClickPlayButton} />;
}

export default PlayButton;
