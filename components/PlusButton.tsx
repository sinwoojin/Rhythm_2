'use client';
import { useModalStore } from '@/zustand/modalStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { IoIosAddCircleOutline } from 'react-icons/io';
interface PlusButtonProps {
  playlistId: string;
  playlistName: string;
}

function PlusButton({ playlistId, playlistName }: PlusButtonProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const addTrackToPlaylist = useSpotifyStore(
    (state) => state.addTrackToPlaylist,
  );
  const track = useSpotifyStore((state) => state.currentTrack);

  if (!track) return;
  const trackUri = track.uri;
  const handleClickAddTrackButton = () => {
    addTrackToPlaylist(playlistId, String(trackUri));
    closeModal();
  };

  return (
    <button
      className="flex items-center gap-x-3 px-4 py-1"
      onClick={handleClickAddTrackButton}
    >
      <div className="min-w-10 min-h-10 text-white/70 bg-black/10">
        <IoIosAddCircleOutline className="w-full h-full p-2" />
      </div>
      <div className="flex flex-col text-start">
        <p className="line-clamp-1 text-white/90 text-sm">{playlistName}</p>
      </div>
    </button>
  );
}

export default PlusButton;
