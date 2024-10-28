'use client';
import useSpotifyStore from '@/zustand/spotifyStore';
interface PlusButtonProps {
  trackUri: string;
}

const MY_PLAYLIST_ID = '32v2pHqcrHlAmYs42NEHtO';

function PlusButton({ trackUri }: PlusButtonProps) {
  const addTrackToPlaylist = useSpotifyStore(
    (state) => state.addTrackToPlaylist,
  );
  const handleClickAddTrack = () => {
    addTrackToPlaylist(MY_PLAYLIST_ID, String(trackUri));
    console.log(trackUri);
  };

  return <button onClick={handleClickAddTrack}>추가하기</button>;
}

export default PlusButton;
