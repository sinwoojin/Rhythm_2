'use client';

import { supabaseToggleLike } from '@/api/supabaseTrackLikeApi';
import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PiHeartStraightDuotone, PiHeartStraightFill } from 'react-icons/pi';
import { Bounce, toast } from 'react-toastify';

interface ToggleLikeButtonProps {
  trackId: string;
}

function LikeButton({ trackId }: ToggleLikeButtonProps) {
  const [isLike, setIsLike] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.id;

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const isLike = supabase
        .from('likeMusic')
        .select('*')
        .eq('trackId', trackId)
        .eq('userId', userId);
      if (isLike) setIsLike(true);
    })();
  }, []);

  useMutation({ mutationKey: ['likeTrack', isLike], mutationFn: () => {} }, qu);

  const handleClickTrackLike = async (trackId: string) => {
    if (!currentUser) return toast.error('로그인이 필요한 서비스 입니다');

    if (!isLike) {
      const data = {
        userId: String(userId),
        trackId: String(trackId),
      };
      await supabaseToggleLike.likeTrack(data);
      toast.success('트랙을 좋아요 하셨습니다', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } else {
      supabaseToggleLike.unLikeTrack(trackId);
      toast.info('트랙 좋아요를 취소 하셨습니다', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  return (
    <div className="w-14 h-14 text-center justify-center">
      <button
        className="pl-2.5 bg-red-500 w-full h-full rounded-full text-white transition-all duration-300 hover:scale-110 text-4xl"
        onClick={() => handleClickTrackLike(trackId)}
      >
        {isLike ? <PiHeartStraightDuotone /> : <PiHeartStraightFill />}
      </button>
    </div>
  );
}

export default LikeButton;
