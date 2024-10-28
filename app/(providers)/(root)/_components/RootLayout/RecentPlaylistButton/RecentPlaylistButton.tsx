'use client';

import RecentPlaylistModal from '@/app/(providers)/_components/RecentPlaylistModal/RecentPlaylistModal';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import { useQueryClient } from '@tanstack/react-query';
import { BsMusicNoteList } from 'react-icons/bs';

function RecentPlaylistButton() {
  const openModal = useModalStore((state) => state.openModal);

  const currentUser = useAuthStore((state) => state.currentUser);
  const queryClient = useQueryClient();

  // 최근재생목록 열기
  const handleClickOpenRecentPlaylistButton = () => {
    openModal({ element: <RecentPlaylistModal />, backdrop: false });
    queryClient.invalidateQueries({
      queryKey: ['recentPlay', currentUser?.id],
    });
  };
  return (
    <button
      onClick={handleClickOpenRecentPlaylistButton}
      aria-label="재생한 곡 목록 버튼"
      className="text-3xl text-gray-400 p-2 transition-all duration-75 hover:text-white hover:scale-110"
    >
      <BsMusicNoteList />
    </button>
  );
}

export default RecentPlaylistButton;
