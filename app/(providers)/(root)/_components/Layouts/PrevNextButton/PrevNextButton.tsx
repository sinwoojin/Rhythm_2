import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

function PrevNextButton() {
  return (
    <>
      <button>
        <IoChevronBackOutline className="absolute left-0 top-1/2 -translate-x-1/2 translate-y-1/2 text-4xl text-white bg-[#242424] p-2 rounded-full" />
      </button>
      <button>
        <IoChevronForwardOutline className="absolute right-0 top-1/2 translate-x-1/2 translate-y-1/2 text-4xl text-white bg-[#242424] p-2 rounded-full" />
      </button>
    </>
  );
}

export default PrevNextButton;
