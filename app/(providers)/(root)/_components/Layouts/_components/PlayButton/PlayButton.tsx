'use client';

import { Track } from '@/schema/type';
import useSpotifyStore from '@/zustand/spotifyStore';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
  playlistTracks?: { track: Track }[];
  albumTracks?: Track[];
  track: Track;
  index: number;
}

function PlayButton({
  playlistTracks,
  albumTracks,
  track,
  index,
}: PlayButtonProps) {
  // spotify store
  const play = useSpotifyStore((state) => state.play);
  const pause = useSpotifyStore((state) => state.pause);
  const currentTrack = useSpotifyStore((state) => state.currentTrack);

  // 재생 버튼
  const handleTogglePlayButton = (index: number) => {
    if (!playlistTracks && !albumTracks) return;

    const playlistTrackUri = playlistTracks
      ? playlistTracks[index]?.track.uri
      : null;
    const albumTrackUri = albumTracks ? albumTracks[index].uri : null;

    if (playlistTracks && playlistTrackUri) {
      if (playlistTrackUri) {
        pause();
      } else {
        play([playlistTrackUri]);
      }
    } else if (albumTracks && albumTrackUri) {
      if (albumTrackUri[index]) {
        pause();
      } else {
        play([albumTrackUri[index]]);
      }
    }
  };

  return (
    <button
      onClick={() => handleTogglePlayButton(index)}
      aria-label={currentTrack?.uri === track?.uri ? '멈추기' : '재생'}
      className="hidden group-hover:block text-xl hover:scale-110 transition-transform"
    >
      {currentTrack?.uri === track?.uri ? (
        <BsFillPauseFill />
      ) : (
        <BsFillPlayFill />
      )}
    </button>
  );
}

export default PlayButton;
