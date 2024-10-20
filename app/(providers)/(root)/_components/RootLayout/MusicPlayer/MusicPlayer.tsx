'use client';

import { PlayTrack } from '@/schema/type';
import { useCurrentTrackStore } from '@/zustand/useCurrentTrackStore';
import { useEffect, useState } from 'react';
import { BsMusicNoteList, BsRepeat } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { RxShuffle } from 'react-icons/rx';
import LyricsButton from '../LyricsButton/LyricsButton';
import OptionButton from '../OptionButton/OptionButton';

interface Player {
  addListener: (event: string, callback: (...args: unknown[]) => void) => void;
  connect: () => Promise<void>;
  togglePlay: () => Promise<void>;
  queue: (trackUri: string) => Promise<boolean>;
}

function MusicPlayer() {
  // 플레이어 정보
  const [player, setPlayer] = useState<Player | null>(null);
  // 현재 엑세스 토큰
  const [accessToken, setAccessToken] = useState<string | null>('null');
  // 재생 상태
  const [isPaused, setPaused] = useState(true);
  // 현재 재생하고있는 트랙 정보
  const [currentTrack, setCurrentTrack] = useState<PlayTrack | null>(null);
  // 현재 사용하고 있는 디바이스 id (웹 페이지, 앱)
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const currentTrackId = useCurrentTrackStore((state) => state.currentTrackId);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const storedToken = window.localStorage.getItem(
          'spotify_provider_token',
        ); //토큰을 localStorage에서 가져오는 함수
        if (storedToken)
          setAccessToken(
            'BQAKtt775gt31uMYIu9nYtBOMDiGWi-jOAqyIBO4w73gG4jkumpyW-c7BmhnDCOHAkQn5a97mtVMuoWU_KYr2DDc8E1uhTT3XeO7L54UPu9iADVDYEC1HPmF4Qo4M-x9DDxIlgw7smit79zMqoA0sWgcQ6RMD5rcT5fWv6xgRnhzHhkbn4MgIzdG7S_jOmrHRM-zqfXtqzaKW72gz7qwcMr9_rP-4UkXv5n7',
          );
      } catch (error) {
        console.error('Access Token 가져오기 오류:', error);
        alert(
          'Access Token을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.',
        );
      }
    };
    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    // Spotify Player SDK 스크립트 추가
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    document.body.appendChild(script);

    // SDK가 준비되면 플레이어 초기화
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(accessToken!);
        },
        volume: 0.5,
      });

      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id); // 장치 ID 저장
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) return;
        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);
      });

      player.connect();
      setPlayer(player);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [accessToken]);

  const playTrack = async (uri: string) => {
    if (player && deviceId) {
      await fetch(`https://api.spotify.com/v1/me/player`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: true,
        }),
      });

      // 현재 트랙 재생
      fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ uris: [uri] }),
      });
    }
  };

  const pauseTrack = async () => {
    if (player && deviceId) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player/pause`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (error) {
        console.error('Error pausing track:', error);
      }
    }
  };

  const nextTrack = async () => {
    if (player && deviceId) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player/next`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (error) {
        console.error('Error skipping to next track:', error);
      }
    }
  };

  return (
    <div className="fixed bottom-0 w-full bg-[#121212] grid grid-cols-7 py-6 px-8 max-h-[116px]">
      <div
        id="music-player-left"
        className="col-span-2 flex items-center gap-x-4"
      >
        <div className="bg-gray-400 h-full aspect-square">
          {currentTrack ? (
            <img src={currentTrack.album.images[0].url} alt="" />
          ) : null}
          {/* 노래 썸네일? url 넣어주면 됨 */}
        </div>
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
              onClick={() => playTrack(currentTrackId)}
            >
              <FaPlay />
            </button>
          ) : (
            <button
              aria-label="멈춤 버튼"
              className="text-4xl py-4 pl-5 pr-3 text-red-500"
              onClick={() => pauseTrack()}
            >
              <FaPause />
            </button>
          )}
        </div>

        {/* 다음 곡 버튼 */}
        <button
          aria-label="다음 곡 버튼"
          className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
          onClick={() => nextTrack()}
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
