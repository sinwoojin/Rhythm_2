import React from "react";
import { BsMusicNoteList, BsRepeat } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { MdOutlineLyrics } from "react-icons/md";
import { RxShuffle } from "react-icons/rx";
import { SlOptions } from "react-icons/sl";

function MusicPlayer() {
  return (
    <div className="w-full bg-black grid grid-cols-7 py-6 px-8">
      <div
        id="music-player-left"
        className="col-span-2 flex items-center gap-x-4"
      >
        <div className="bg-gray-400 w-14 h-14">
          {/* <img src="" alt="" /> */}
          {/* 노래 썸네일? url 넣어주면 됨 */}
        </div>
        <div>
          <p className="text-white font-bold text-lg">music title</p>
          <p className="text-gray-400">music singer</p>
        </div>
        <div className="flex items-center gap-x-2">
          <button className="text-gray-400 py-2 text-5xl transition-all duration-75 hover:text-white">
            <CiHeart />
          </button>
          <button className="text-gray-400 py-2 text-4xl transition-all duration-75 hover:text-white">
            <MdOutlineLyrics />
          </button>
          <button className="text-gray-400 py-2 text-3xl transition-all duration-75 hover:text-white">
            <SlOptions />
          </button>
        </div>
      </div>
      <div
        id="music-player-middle"
        className="mx-20 col-span-3 justify-evenly items-center flex"
      >
        <button className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110">
          <RxShuffle />
        </button>
        <button className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110">
          <IoMdSkipBackward />
        </button>
        <div className="rounded-full transition-all duration-300 hover:bg-white hover:bg-opacity-30">
          <button className="text-4xl py-4 pl-5 pr-3 text-red-500">
            <FaPlay />
          </button>
        </div>
        <button className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110">
          <IoMdSkipForward />
        </button>
        <button className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110">
          <BsRepeat />
        </button>
      </div>
      <div
        id="music-player-right"
        className="col-span-2 flex flex-row-reverse items-center"
      >
        <button className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110">
          <BsMusicNoteList />
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
