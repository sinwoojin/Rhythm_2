'use client';
import OptionModal from '@/app/(providers)/_components/OptionModal/OptionModal';
import { useModalStore } from '@/zustand/modalStore';
import { cx } from 'class-variance-authority';
import { SlOptions } from 'react-icons/sl';
interface OptionButtonProps {
  location: string;
}
function OptionButton({ location }: OptionButtonProps) {
  const openModal = useModalStore((state) => state.openModal);
  const handleClickOption = () => {
    openModal({
      element: <OptionModal location={location} />,
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
