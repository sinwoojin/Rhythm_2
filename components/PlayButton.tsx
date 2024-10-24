'use client';

import { Track } from '@/schema/type';
import useSpotifyStore from '@/zustand/spotifyStore';
import { FaPause, FaPlay } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface PlayButtonProps {
  track: Track | undefined;
}

function PlayButton(props: PlayButtonProps) {
  const play = useSpotifyStore((state) => state.play);
  const pause = useSpotifyStore((state) => state.pause);
  const isPaused = useSpotifyStore((state) => state.isPaused);

  const handleClickPlayButton = () => {
    const trackURI = props.track?.uri;
    if (!trackURI) return toast.error('해당 음악이 존재하지 않습니다.');

    play(trackURI);
  };

  return (
    <div>
      {isPaused ? (
        <button
          aria-label="재생 버튼"
          className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl"
          onClick={handleClickPlayButton}
        >
          <FaPlay type="button" />
        </button>
      ) : (
        <button
          aria-label="멈춤 버튼"
          className="bg-red-500 py-4 pl-4 pr-4 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl"
          onClick={pause}
        >
          <FaPause />
        </button>
      )}
    </div>
  );
}

export default PlayButton;
