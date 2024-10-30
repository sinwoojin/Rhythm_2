import { useAuthStore } from '@/zustand/authStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useRef } from 'react';
import MuteButton from './MuteButton';

function VolumeBar() {
  const setVolume = useSpotifyStore((state) => state.setVolume);
  const volumeRef = useRef<HTMLInputElement>(null);
  const currentUser = useAuthStore((state) => state.currentUser);

  const handleSetVolume = () => {
    if (!currentUser) return;
    const volume = Math.floor(Number(volumeRef.current?.valueAsNumber));
    setVolume(volume);
  };

  return (
    <div className="flex items-center gap-x-2">
      <MuteButton volumeRef={volumeRef} />
      <input
        type="range"
        className="mr-6 accent-red-500 w-full col-span-1 cursor-pointer"
        min={0}
        max={100}
        color="gray"
        step={2}
        ref={volumeRef}
        onMouseUp={handleSetVolume}
      />
    </div>
  );
}

export default VolumeBar;
