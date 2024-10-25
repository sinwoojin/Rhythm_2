'use client';

import LikeButton from '@/components/LikeButton';
import useSpotifyStore from '@/zustand/spotifyStore';
import { BsMusicNoteList } from 'react-icons/bs';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { PiHeartStraightDuotone } from 'react-icons/pi';
import LyricsButton from '../LyricsButton/LyricsButton';
import OptionButton from '../OptionButton/OptionButton';
import { useRef } from 'react';

function MusicPlayer() {
  const currentTrack = useSpotifyStore((state) => state.currentTrack);
  const isPaused = useSpotifyStore((state) => state.isPaused);
  const pause = useSpotifyStore((state) => state.pause);
  const playPrevTrack = useSpotifyStore((state) => state.playPrevTrack);
  const playNextTrack = useSpotifyStore((state) => state.playNextTrack);
  const setVolume = useSpotifyStore((state) => state.setVolume);
  const valueAsNumberRef = useRef<HTMLInputElement>(null);

  const trackId = currentTrack?.id;

  const handleChangeVolume = () => {
    const volume = Number(valueAsNumberRef.current?.valueAsNumber) * 100;
    if (!volume) return;
    if (volume % 100 === 0) return;
    // setVolume(volume);
  };

  return (
    <div className="fixed bottom-0 w-full bg-[#121212] grid grid-cols-7 py-6 px-8 max-h-[116px] z-30">
      <div
        id="music-player-left"
        className="col-span-2 grid grid-cols-5 gap-x-2 items-center"
      >
        {currentTrack ? (
          <div className="bg-gray-400 w-full aspect-square col-span-1">
            <img
              className="w-full h-full object-cover"
              src={currentTrack.album.images[1].url}
              alt={currentTrack.album.name}
            />
          </div>
        ) : (
          <div className="bg-gray-400 w-full aspect-square col-span-1"></div>
        )}
        {/* 노래 썸네일? url 넣어주면 됨 */}

        <div className="flex flex-col col-span-2">
          <p className="text-white font-bold text-lg line-clamp-1">
            {currentTrack ? currentTrack.name : 'music title'}
          </p>
          <p className="text-gray-400 line-clamp-1">
            {currentTrack
              ? currentTrack.artists.map((artist) => artist.name).join(', ')
              : 'music singer'}
          </p>
        </div>
        <div className="flex items-center gap-x-2 col-span-2">
          <button
            aria-label="좋아요 버튼"
            className="text-gray-400 py-2 text-4xl transition-all duration-75 hover:text-white"
          >
            {!trackId ? (
              <PiHeartStraightDuotone />
            ) : (
              <LikeButton hasBorder={false} trackId={trackId} />
            )}
          </button>
          {/* 가사 보기 버튼 */}
          <LyricsButton />
          {/* 곡 정보 버튼 */}
          <OptionButton />
        </div>
      </div>
      <div
        id="music-player-middle"
        className="mx-20 col-span-3 flex gap-x-6 justify-center items-center"
      >
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
              onClick={() => [currentTrack!.uri]}
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
      </div>
      <div
        id="music-player-right"
        className="col-span-2 grid-cols-2 items-center gap-x-2"
      >
        {/* 현재 재생한 곡들의 목록 */}
        <div className="grid-cols-1">
          <button
            aria-label="재생한 곡 목록 버튼"
            className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
          >
            <BsMusicNoteList />
          </button>
        </div>
        <div className="grid-cols-1">
          <input
            type="range"
            className="mr-6 accent-red-500 w-full col-span-1"
            min={0}
            max={1}
            color="gray"
            step={0.02}
            ref={valueAsNumberRef}
            onMouseUp={handleChangeVolume}
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
