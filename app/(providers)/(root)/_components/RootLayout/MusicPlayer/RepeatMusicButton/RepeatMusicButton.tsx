'use client';

import { api } from '@/api/spotifyApi';
import { useAuthStore } from '@/zustand/authStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { cx } from 'class-variance-authority';
import { useState } from 'react';
import { PiRepeatBold } from 'react-icons/pi';

function RepeatMusicButton() {
  const [isClicked, setIsClicked] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);
  const accessToken = useSpotifyStore((state) => state.accessToken);

  const handleClickRepeatTrack = () => {
    if (!currentUser) return;
    api.playMusic.setRepeatMusic(String(accessToken), 'track');
    setIsClicked((prev) => !prev);
  };

  return (
    <button
      aria-label="노래 반복"
      className={cx(
        'text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110',
        {
          'text-white': isClicked,
        },
      )}
      onClick={() => handleClickRepeatTrack()}
    >
      <PiRepeatBold />
    </button>
  );
}

export default RepeatMusicButton;
