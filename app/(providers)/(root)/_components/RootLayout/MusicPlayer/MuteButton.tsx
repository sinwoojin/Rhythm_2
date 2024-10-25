'use client';

import useSpotifyStore from '@/zustand/spotifyStore';
import React, { RefObject } from 'react';
import { FaVolumeDown, FaVolumeMute } from 'react-icons/fa';

function MuteButton({ volumeRef }: { volumeRef: RefObject<HTMLInputElement> }) {
  const volume = useSpotifyStore((state) => state.volume);
  const setVolume = useSpotifyStore((state) => state.setVolume);
  const isMute = volume === 0;

  const handleClickButton = () => {
    if (!volumeRef.current) return;

    if (volume === 0) {
      setVolume(50);
      volumeRef.current.value = '50';
    } else {
      setVolume(0);
      volumeRef.current.value = '0';
    }
  };

  return (
    <button
      onClick={handleClickButton}
      className="text-gray-400 text-2xl transition-all duration-75 hover:text-white hover:scale-110"
    >
      {isMute ? <FaVolumeMute /> : <FaVolumeDown />}
    </button>
  );
}

export default MuteButton;
