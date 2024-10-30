import { ComponentProps } from 'react';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

interface WhiteSmallButtonProps extends ComponentProps<'button'> {
  isPaused: boolean;
}

function WhiteSmallButton({ isPaused, ...props }: WhiteSmallButtonProps) {
  const buttonClassName =
    'hidden group-hover:block text-xl hover:scale-110 transition-transform';

  if (isPaused)
    return (
      <button aria-label="재생 버튼" className={buttonClassName} {...props}>
        <BsFillPlayFill />
      </button>
    );

  return (
    <button aria-label="멈춤 버튼" className={buttonClassName} {...props}>
      <BsFillPauseFill />
    </button>
  );
}

export default WhiteSmallButton;
