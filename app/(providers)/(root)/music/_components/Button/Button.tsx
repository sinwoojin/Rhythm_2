'use client';

import { pauseTrack, playTrack } from '@/api/spotifyPlayMusicAPI';
import { Track } from '@/schema/type';
import { useCurrentTrackStore } from '@/zustand/useCurrentTrackStore';
import { useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

interface PlayButtonProps {
  track: Track | undefined;
}

function PlayButton(props: PlayButtonProps) {
  // 현재 엑세스 토큰
  const [accessToken, setAccessToken] = useState<string | null>('null');
  // 현재 사용하고 있는 디바이스 id (웹 페이지, 앱)
  const [deviceId, setDeviceId] = useState<string | null>(null);
  // 재생 상태
  const [isPaused, setPaused] = useState(true);

  const setCurrentTrackURI = useCurrentTrackStore(
    (state) => state.setCurrentTrackURI,
  );

  // 현재 페이지의 트랙 uri 정보
  const trackUri = props.track?.uri;

  // 재생 버튼
  const handleClickPlayButton = () => {
    setCurrentTrackURI(String(trackUri));
    playTrack(String(trackUri), String(accessToken), String(deviceId));
  };

  // 현재 토큰 불러오기
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
        setPaused(state.paused);
      });

      player.connect();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [accessToken]);

  return (
    <div>
      {isPaused ? (
        <button
          aria-label="재생 버튼"
          className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl"
          onClick={handleClickPlayButton}
        >
          <FaPlay type="button" />
        </button>
      ) : (
        <button
          aria-label="멈춤 버튼"
          className="bg-red-500 py-4 pl-4 pr-4 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl"
          onClick={() => pauseTrack(String(accessToken))}
        >
          <FaPause />
        </button>
      )}
    </div>
  );
}

export default PlayButton;
