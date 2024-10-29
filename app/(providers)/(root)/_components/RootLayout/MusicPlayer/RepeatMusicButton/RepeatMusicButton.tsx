import { cx } from 'class-variance-authority';
import React, { useState } from 'react';
import { PiRepeatBold } from 'react-icons/pi';

function RepeatMusicButton() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <button
      aria-label="노래 반복"
      className={cx(
        'text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110',
        {
          'text-white': isClicked,
        },
      )}
      onClick={() => setIsClicked((prev) => !prev)}
    >
      <PiRepeatBold />
    </button>
  );
}

export default RepeatMusicButton;
