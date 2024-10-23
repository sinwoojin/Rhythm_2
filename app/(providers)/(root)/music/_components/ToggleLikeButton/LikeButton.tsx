'use client';

import { supabaseToggleLike } from '@/api/supabaseTrackLikeApi';
import { useAuthStore } from '@/zustand/authStore';
import { useLikeStore } from '@/zustand/likeStore';
import { nanoid } from 'nanoid';
import { PiHeartStraightDuotone, PiHeartStraightFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

interface ToggleLikeButtonProps {
  trackId: string;
}

function LikeButton({ trackId }: ToggleLikeButtonProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.id;
  const isLike = useLikeStore((state) => state.isLike);
  const like = useLikeStore((state) => state.like);
  const unLike = useLikeStore((state) => state.unLike);

  const handleClickTrackLike = async (trackId: string) => {
    if (!currentUser) toast.error('로그인이 필요한 서비스 입니다');
    if (!isLike) {
      const data = {
        id: nanoid(),
        userId: String(userId),
        trackId: String(trackId),
      };
      await supabaseToggleLike.likeTrack(data);
      like();
    } else {
      supabaseToggleLike.unLikeTrack(trackId);
      unLike();
    }
  };

  return (
    <div className="w-14 h-14 text-center justify-center">
      {isLike ? (
        <button
          className="pl-2.5 bg-red-500 w-full h-full rounded-full text-white transition-all duration-300 hover:scale-110 text-4xl"
          onClick={() => handleClickTrackLike(trackId)}
        >
          <PiHeartStraightDuotone />
        </button>
      ) : (
        <button
          className="bg-red-500 py-4 pl-4 pr-4 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl"
          onClick={() => handleClickTrackLike(trackId)}
        >
          <PiHeartStraightFill />
        </button>
      )}
    </div>
  );
}

export default LikeButton;
