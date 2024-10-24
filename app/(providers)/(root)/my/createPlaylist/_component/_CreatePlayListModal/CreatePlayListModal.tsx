'use client';
import { getRefreshToken } from '@/api/getToken';
import { api } from '@/api/spotifyApi';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PublicCheckButton from '../_PublicCheckButton/PublicCheckButton';

function CreatePlayListModal() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const closeModal = useModalStore((state) => state.closeModal);
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        {
          const storedToken = window.localStorage.getItem(
            'spotify_provider_token',
          ); //토큰을 localStorage에서 가져오는 함수
          if (storedToken) setAccessToken(storedToken);
        }
      } catch (error) {
        console.error('Access Token 가져오기 오류:', error);
        alert(
          'Access Token을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.',
        );
      }
    };

    fetchAccessToken();
  }, []);

  const ensureAccessToken = async () => {
    if (!accessToken) {
      try {
        // LocalStorage에 저장된 토큰 가져오기
        const token = window.localStorage.getItem('spotify_provider_token');
        const refreshToken = window.localStorage.getItem('refresh_token');

        if (token) return token;

        if (refreshToken) {
          // Refresh Token으로 새 Access Token 발급
          const newAccessToken = await getRefreshToken();
          setAccessToken(newAccessToken); // 상태 업데이트
          return newAccessToken; // 새 액세스 토큰 반환
        }

        alert('Access token이 없습니다. 다시 로그인해 주세요.');
        return null;
      } catch (error) {
        console.error('토큰 갱신 중 오류:', error);
        return null;
      }
    }
    return accessToken; // 이미 유효한 토큰이 있는 경우 반환
  };

  const handleClickCreatePlayList = async () => {
    if (!title || !description) {
      alert('제목과 설명을 모두 입력해 주세요.');

      return;
    }

    setIsLoading(true);
    closeModal();

    try {
      const token = await ensureAccessToken();
      if (!token) return; // 토큰 없으면 종료

      const createPlaylist = await api.userPlay.createPlaylists(
        title,
        description,
        isPublic,
        String(currentUser!.spotifyId),
        token,
      );
      router.push('/');
      return createPlaylist;
    } catch (error) {
      console.error('플레이리스트 생성 중 오류 발생:', error);
      alert('플레이리스트 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleCheck = () => setIsPublic((prev) => !prev);

  const handleClickCancelButton = () => closeModal();

  return (
    <div
      className="absolute top-[50%] left-[50%] w-[500px] bg-[#121212] -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white p-10"
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
