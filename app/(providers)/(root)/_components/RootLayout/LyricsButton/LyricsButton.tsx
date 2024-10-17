"use client";

import { useModalStore } from "@/zustand/modalStore";
import { MdOutlineLyrics } from "react-icons/md";

function Lyrics() {
  const setIsOnLyricsModal = useModalStore((state) => state.setIsOnLyricsModal);
  const isOnLyricsModal = useModalStore((state) => state.isOnLyricsModal);
  const handleClickLyrics = () => {
    setIsOnLyricsModal(true);
    console.log(isOnLyricsModal);
  };
  return (
    <button
      onClick={handleClickLyrics}
      className="text-gray-400 py-2 text-4xl transition-all duration-75 hover:text-white"
    >
      <MdOutlineLyrics />
    </button>
  );
}

export default Lyrics;
