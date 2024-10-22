'use client';

import {
  fetchAccessToken,
  pauseTrack,
  playTrack,
  spotifySDKSetting,
} from '@/api/spotifyPlayMusicAPI';
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

  // 장치 설정, 현재 토큰 불러오기
  useEffect(() => {
    (async () => {
      await fetchAccessToken(setAccessToken);

      if (!accessToken) return;

      spotifySDKSetting({
        accessToken,
        setDeviceId,
        setPaused,
      });
    })();
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
