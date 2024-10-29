'use client';

import { Track } from '@/schema/type';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useState } from 'react';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
  playlistTracks?: { track: Track }[];
  albumTracks?: Track[];
  playlistUri?: string;
  albumUri?: string;
  track: Track;
  index: number;
}

function PlayButton({
  playlistTracks,
  albumTracks,
  playlistUri,
  albumUri,
  track,
  index,
}: PlayButtonProps) {
  // spotify store
  const play = useSpotifyStore((state) => state.play);
  const pause = useSpotifyStore((state) => state.pause);
  const currentTrack = useSpotifyStore((state) => state.currentTrack);

  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);

  console.log('index', index);

  // 재생 버튼
  const handleTogglePlayButton = (index: number) => {
    if (!playlistTracks && !albumTracks) return;

    const trackId = playlistTracks![index].track.id || albumTracks![index]?.id;

    if (!trackId) return;
    setCurrentTrackId((prev) => trackId);

    if (trackId === currentTrack?.id) {
      pause();
    } else {
      const uri = playlistUri || albumUri;
      if (uri) play(uri, index);
    }
  };

  return (
    <button
      onClick={() => handleTogglePlayButton(index)}
      aria-label={currentTrack?.id === currentTrackId ? '멈추기' : '재생'}
      className="hidden group-hover:block text-xl hover:scale-110 transition-transform"
    >
      {currentTrack?.id === currentTrackId ? (
        <BsFillPauseFill />
      ) : (
        <BsFillPlayFill />
      )}
    </button>
  );
}

export default PlayButton;
