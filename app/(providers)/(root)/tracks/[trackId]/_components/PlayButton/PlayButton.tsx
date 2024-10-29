import { Track } from '@/schema/type';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useState } from 'react';

interface PlayButtonProps {
  track: Track | undefined;
}
function PlayButton(props: PlayButtonProps) {
  const [equalTrack, setEqualTrack] = useState(false);
  const prevTrackId = useSpotifyStore((state) => state.currentTrack?.id);
  const currentTrackId = props.track?.id;
  const pause = useSpotifyStore((state) => state.pause);

  const handleClickPlayButton = () => {
    if (prevTrackId === currentTrackId) {
      setEqualTrack(true);
    } else {
      pause();
      setEqualTrack(false);
    }
  };

  return <div>PlayButton</div>;
}

export default PlayButton;
