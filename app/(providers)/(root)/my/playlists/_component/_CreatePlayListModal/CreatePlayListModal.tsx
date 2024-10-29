'use client';
import { api } from '@/api/spotifyApi';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PublicCheckButton from '../_PublicCheckButton/PublicCheckButton';

function CreatePlayListModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const closeModal = useModalStore((state) => state.closeModal);
  const currentUser = useAuthStore((state) => state.currentUser);
  const accessToken = useSpotifyStore((state) => state.accessToken);

  const { mutate: createPlaylist } = useMutation({
    mutationFn: async () => {
      if (!accessToken)
        return toast.error('accessToken이 만료되었거나 없습니다.');

      const createPlaylist = await api.userPlay.createPlaylists(
        title,
        description,
        isPublic,
        String(currentUser!.spotifyId),
        accessToken!,
      );

      return createPlaylist;
    },
    onSuccess: () => {
      toast.success('플레이리스트가 성공적으로 생성되었습니다!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(error);
      toast.error(error || '플레이 리스트 생성중 에러가 남');
    },
  });

  const handleClickCreatePlayList = async () => {
    if (!title || !description) {
      toast.warn('제목과 설명을 모두 입력해 주세요.');

      return;
    }

    setIsLoading(true);
    closeModal();

    createPlaylist();
  };

  const handleToggleCheck = () => setIsPublic((prev) => !prev);

  const handleClickCancelButton = () => closeModal();

  return (
    <div
      className="absolute top-[50%] left-[50%] w-[500px] bg-rhythm -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white p-10"
      onClick={(e) => e.stopPropagation()}
    >
      <h4 className="text-xl font-semibold text-center py-10">
        새 플레이리스트
      </h4>
      <div className="flex flex-col gap-y-5">
        <Input
          className="outline-none"
          placeholder="플레이 리스트 제목"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          className="outline-none"
          placeholder="플레이 리스트 소개 글"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="h-16 flex items-center justify-between">
          <span className="text-[15px] px-2.5 py-1 font-semibold">
            공개 설정
          </span>
          <PublicCheckButton
            isChecked={isPublic}
            onToggle={handleToggleCheck}
          />
        </div>
        <div className="flex gap-x-5">
          <Button onClick={handleClickCancelButton} className="w-full h-12">
            취소
          </Button>
          <Button
            onClick={handleClickCreatePlayList}
            className={`w-full h-12 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? '생성 중...' : '만들기'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlayListModal;
