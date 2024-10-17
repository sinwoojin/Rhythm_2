import { BsMusicNoteList, BsRepeat } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { RxShuffle } from "react-icons/rx";
import LyricsButton from "../_LyricsButton/LyricsButton";
import OptionButton from "../_OptionButton/OptionButton";

function MusicPlayer() {
  return (
    <div className="fixed bottom-0 w-full bg-[#121212] grid grid-cols-7 py-6 px-8 max-h-[116px]">
      <div
        id="music-player-left"
        className="col-span-2 flex items-center gap-x-4"
      >
        <div className="bg-gray-400 h-full aspect-square">
          {/* <img src="" alt="" /> */}
          {/* 노래 썸네일? url 넣어주면 됨 */}
        </div>
        <div>
          <p className="text-white font-bold text-lg text-nowrap">
            music title
          </p>
          <p className="text-gray-400 text-nowrap">music singer</p>
        </div>
        <div className="flex items-center gap-x-2">
          <button className="text-gray-400 py-2 text-5xl transition-all duration-75 hover:text-white">
            <CiHeart />
          </button>
          <LyricsButton />
          <OptionButton />
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
