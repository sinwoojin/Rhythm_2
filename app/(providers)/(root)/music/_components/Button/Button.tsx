'use client';

import { Track } from '@/schema/type';
import { useCurrentTrackStore } from '@/zustand/useCurrentTrackStore';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

interface PlayButtonProps {
  track: Track | undefined;
}

interface Player {
  addListener: (event: string, callback: (...args: unknown[]) => void) => void;
  connect: () => Promise<void>;
  togglePlay: () => Promise<void>;
  queue: (trackUri: string) => Promise<boolean>;
}

function PlayButton(props: PlayButtonProps) {
  // 플레이어 정보
  const [player, setPlayer] = useState<Player | null>(null);
  // 현재 엑세스 토큰
  const [accessToken, setAccessToken] = useState<string | null>('null');
  // 현재 사용하고 있는 디바이스 id (웹 페이지, 앱)
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const setCurrentTrackId = useCurrentTrackStore(
    (state) => state.setCurrentTrackId,
  );
  const trackUri = props.track?.uri;

  const handleClickPlayButton = () => {
    setCurrentTrackId(String(trackUri));
    playTrack(String(trackUri));
  };

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

  return (
    <div>
      <button
        aria-label="재생 버튼"
        className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl"
        onClick={handleClickPlayButton}
      >
        <FaPlay type="button" />
      </button>
    </div>
  );
}

export default PlayButton;
