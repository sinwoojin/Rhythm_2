"use client";

import { useModalStore } from "@/zustand/modalStore";
import { SlOptions } from "react-icons/sl";

function OptionButton() {
  const setIsOnLyricsModal = useModalStore((state) => state.setIsOnOptionModal);
  const isOnOptionModal = useModalStore((state) => state.isOnOptionModal);
  const handleClickOption = () => {
    setIsOnLyricsModal(true);
    console.log(isOnOptionModal);
  };
  return (
    <button
      onClick={handleClickOption}
      className="text-gray-400 py-2 text-4xl transition-all duration-75 hover:text-white"
    >
      <SlOptions />
    </button>
  );
}

export default OptionButton;
