'use client';
import OptionModal from '@/app/(providers)/_components/OptionModal/OptionModal';
import { Track } from '@/schema/type';
import { useModalStore } from '@/zustand/modalStore';
import { cx } from 'class-variance-authority';
import { SlOptions } from 'react-icons/sl';
interface OptionButtonProps {
  location: string;

  trackTitle?: string;
  trackImg?: string;
  trackId?: string;
  trackUri?: string;

  artistName?: string[];
  artistsId?: string[];

  track?: Track;

  albumId?: string;
}
function OptionButton({
  location,
  trackTitle,
  trackImg,
  trackId,
  trackUri,
  artistName,
  track,
  artistsId,
  albumId,
}: OptionButtonProps) {
  const openModal = useModalStore((state) => state.openModal);
  const handleClickOption = () => {
    openModal({
      element: (
        <OptionModal
          location={location}
          trackTitle={String(trackTitle)}
          trackImg={String(trackImg)}
          trackId={String(trackId)}
          trackUri={String(trackUri)}
          artistName={artistName}
          track={track}
          artistsId={artistsId}
          albumId={albumId}
        />
      ),
      backdrop: false,
    });
  };
  return (
    <button
      aria-label="옵션 버튼"
      onClick={handleClickOption}
      className={cx(
        'text-gray-400 transition-all duration-75 hover:text-white',
        {
          'text-[18px]': location === 'tracks',
          'text-[28px]': location !== 'tracks',
        },
      )}
    >
      <SlOptions />
    </button>
  );
}

export default OptionButton;
