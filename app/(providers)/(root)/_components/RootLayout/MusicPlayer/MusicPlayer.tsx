'use client';

import { nextTrack, pauseTrack, playTrack } from '@/api/spotifyPlayAPI';
import { PlayTrack } from '@/schema/type';
import { useAuthStore } from '@/zustand/authStore';
import { useCurrentTrackStore } from '@/zustand/useCurrentTrackStore';
import { useEffect, useState } from 'react';
import { BsMusicNoteList, BsRepeat } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { RxShuffle } from 'react-icons/rx';
import LyricsButton from '../LyricsButton/LyricsButton';
import OptionButton from '../OptionButton/OptionButton';

function MusicPlayer() {
  // 현재 엑세스 토큰
  const [accessToken, setAccessToken] = useState<string | null>('null');

  // 재생 상태
  const [isPaused, setPaused] = useState(true);

  // 현재 재생하고있는 트랙 정보
  const [currentTrack, setCurrentTrack] = useState<PlayTrack | null>(null);

  // 현재 사용하고 있는 디바이스 id (웹 페이지, 앱)
  const [deviceId, setDeviceId] = useState<string | null>(null);

  // 현재 가지고있는 트랙 uri
  const currentTrackId = useCurrentTrackStore((state) => state.currentTrackId);

  // 로그인 정보
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 로그인한 유저의 토큰 가져오기
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const storedToken = window.localStorage.getItem(
          'spotify_provider_token',
        ); //토큰을 localStorage에서 가져오는 함수
        if (storedToken) setAccessToken(storedToken);
      } catch (error) {
        console.error('Access Token 가져오기 오류:', error);
        alert(
          'Access Token을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.',
        );
      }
    };
    fetchAccessToken();
  }, []);

  // 장치 설정
  useEffect(() => {
    if (!isLoggedIn) return;
    if (!accessToken) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(accessToken!);
        },
        volume: 0.5,
      });

      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) return;
        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);
      });

      player.connect();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [accessToken, isLoggedIn]);

  return (
    <div className="fixed bottom-0 w-full bg-[#121212] grid grid-cols-7 py-6 px-8 max-h-[116px]">
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
        {/* 셔플 버튼 */}
        <button
          aria-label="셔플 버튼"
          className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
        >
          <RxShuffle />
        </button>

        {/* 이전 곡 버튼 */}
        <button
          aria-label="이전 곡 버튼"
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
              onClick={() =>
                playTrack(currentTrackId, String(accessToken), String(deviceId))
              }
            >
              <FaPlay />
            </button>
          ) : (
            <button
              aria-label="멈춤 버튼"
              className="text-4xl py-4 pl-5 pr-3 text-red-500"
              onClick={() => pauseTrack(String(accessToken))}
            >
              <FaPause />
            </button>
          )}
        </div>

        {/* 다음 곡 버튼 */}
        <button
          aria-label="다음 곡 버튼"
          className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
          onClick={() => nextTrack(String(accessToken))}
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
