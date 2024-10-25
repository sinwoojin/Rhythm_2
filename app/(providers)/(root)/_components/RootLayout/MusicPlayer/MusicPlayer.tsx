'use client';

import LikeButton from '@/components/LikeButton';
import useSpotifyStore from '@/zustand/spotifyStore';
import { BsMusicNoteList, BsRepeat } from 'react-icons/bs';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { PiHeartStraightDuotone } from 'react-icons/pi';
import { RxShuffle } from 'react-icons/rx';
import LyricsButton from '../LyricsButton/LyricsButton';
import OptionButton from '../OptionButton/OptionButton';

function MusicPlayer() {
  const currentTrack = useSpotifyStore((state) => state.currentTrack);
  const isPaused = useSpotifyStore((state) => state.isPaused);
  const play = useSpotifyStore((state) => state.play);
  const pause = useSpotifyStore((state) => state.pause);
  const shuffle = useSpotifyStore((state) => state.shuffle);
  const playPrevTrack = useSpotifyStore((state) => state.playPrevTrack);
  const playNextTrack = useSpotifyStore((state) => state.playNextTrack);
  const trackId = currentTrack?.id;

  return (
    <div className="fixed bottom-0 w-full bg-[#121212] grid grid-cols-7 py-6 px-8 max-h-[116px] z-50">
      <div
        id="music-player-left"
        className="col-span-2 flex items-center gap-x-4"
      >
        {currentTrack ? (
          <img src={currentTrack.album.images[1].url} alt="" />
        ) : (
          <div className="bg-gray-400 h-full aspect-square"></div>
        )}
        {/* 노래 썸네일? url 넣어주면 됨 */}

        <div>
          <p className="text-white font-bold text-lg text-nowrap overflow-hidden text-ellipsis whitespace-nowrap w-[200px]">
            {currentTrack ? currentTrack.name : 'music title'}
          </p>
          <p className="text-gray-400 text-nowrap overflow-hidden text-ellipsis whitespace-nowrap w-[200px]">
            {currentTrack
              ? currentTrack.artists.map((artist) => artist.name).join(', ')
              : 'music singer'}
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            aria-label="좋아요 버튼"
            className="text-gray-400 py-2 text-5xl transition-all duration-75 hover:text-white"
          >
            {!trackId ? (
              <PiHeartStraightDuotone />
            ) : (
              <LikeButton hasBorder={false} trackId={trackId} />
            )}
          </button>
          <LyricsButton />
          <OptionButton />
        </div>
      </div>
      <div
        id="music-player-middle"
        className="mx-20 col-span-3 justify-evenly items-center flex"
      >
        {/* 셔플 버튼 */}
        <button
          aria-label="셔플 버튼"
          onClick={shuffle}
          className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
        >
          <RxShuffle />
        </button>

        {/* 이전 곡 버튼 */}
        <button
          aria-label="이전 곡 버튼"
          onClick={playPrevTrack}
          className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
        >
          <IoMdSkipBackward />
        </button>

        <div className="rounded-full transition-all duration-300 hover:bg-white hover:bg-opacity-30">
          {/* play 버튼 */}
          {isPaused ? (
            <button
              aria-label="플레이 버튼"
              className="text-4xl py-4 pl-5 pr-3 text-red-500"
              onClick={() => play(currentTrack?.uri)}
            >
              <FaPlay />
            </button>
          ) : (
            <button
              aria-label="멈춤 버튼"
              className="text-4xl py-4 pl-4 pr-4 text-red-500"
              onClick={() => pause()}
            >
              <FaPause />
            </button>
          )}
        </div>

        {/* 다음 곡 버튼 */}
        <button
          aria-label="다음 곡 버튼"
          className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
          onClick={playNextTrack}
        >
          <IoMdSkipForward />
        </button>

        {/* 반복 재생 버튼 */}
        <button
          aria-label="반복 재생 버튼"
          className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
        >
          <BsRepeat />
        </button>
      </div>
      <div
        id="music-player-right"
        className="col-span-2 flex flex-row-reverse items-center"
      >
        {/* 현재 재생한 곡들의 목록 */}
        <button
          aria-label="재생한 곡 목록 버튼"
          className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
        >
          <BsMusicNoteList />
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
