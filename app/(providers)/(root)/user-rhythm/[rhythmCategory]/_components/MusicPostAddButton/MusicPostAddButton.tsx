'use client';

import { useModalStore } from '@/zustand/modalStore';
import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import MusicPostAddModal from '../MusicPostAddModal/MusicPostAddModal';

function MusicPostAddButton() {
  const openModal = useModalStore((state) => state.openModal);

  const handleClickMusicPostAddButton = () => {
    // 여기에 노래 추천글 작성하는 버튼 클릭하면 모달 띄워주는 함수 적어주면 됨
    openModal({ element: <MusicPostAddModal />, backdrop: true });
  };
  return (
    <button
      onClick={handleClickMusicPostAddButton}
      className="text-gray-50 rounded-full transition-all duration-300 text-7xl scale-110 hover:scale-125"
    >
      <IoIosAddCircleOutline />
    </button>
  );
}

export default MusicPostAddButton;
