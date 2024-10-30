import { ComponentProps } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

interface BigRedButtonProps extends ComponentProps<'button'> {
  isPaused: boolean;
}

function BigRedButton({ isPaused, ...props }: BigRedButtonProps) {
  const buttonClassName =
    'bg-red-500 text-white rounded-full transition-all duration-300 hover:scale-105 text-4xl h-16 w-16 grid place-items-center';

  if (isPaused)
    return (
      <button aria-label="재생 버튼" className={buttonClassName} {...props}>
        <FaPlay type="button" className="-mr-1.5" />
      </button>
    );

  return (
    <button aria-label="멈춤 버튼" className={buttonClassName} {...props}>
      <FaPause />
    </button>
  );
}

export default BigRedButton;
