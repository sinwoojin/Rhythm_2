"use client";

import LyricsModal from "@/app/(providers)/_components/LyricsModal";
import { useModalStore } from "@/zustand/modalStore";
import React from "react";
import { MdOutlineLyrics } from "react-icons/md";

function Lyrics() {
  const openModal = useModalStore((state) => state.openModal);
  const handleClickLyrics = () => {
    openModal({ element: <LyricsModal />, backdrop: true });
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
