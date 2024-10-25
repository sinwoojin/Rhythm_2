'use client';

import LyricsModal from '@/app/(providers)/_components/LyricsModal';
import { useModalStore } from '@/zustand/modalStore';
import { MdOutlineLyrics } from 'react-icons/md';

function Lyrics() {
  const openModal = useModalStore((state) => state.openModal);
  const handleClickLyrics = () => {
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

export default Lyrics;
