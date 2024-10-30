'use client';

import LyricsModal from '@/app/(providers)/_components/LyricsModal/LyricsModal';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { MdOutlineLyrics } from 'react-icons/md';
import { toast } from 'react-toastify';

function LyricsButton() {
  const openModal = useModalStore((state) => state.openModal);
  const currentTrack = useSpotifyStore((state) => state.currentTrack);
  const currentUser = useAuthStore((state) => state.currentUser);
  const handleClickLyrics = () => {
    if (!currentUser) return;
    if (!currentTrack) return toast.warn('재생중인 음악이 없습니다.');
    openModal({ element: <LyricsModal />, backdrop: true });
  };
  return (
    <button
      aria-label="가사 버튼"
      onClick={handleClickLyrics}
      className="text-gray-400 py-2 text-3xl transition-all duration-75 hover:text-white"
    >
      <MdOutlineLyrics />
    </button>
  );
}

export default LyricsButton;
