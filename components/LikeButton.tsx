'use client';

import { supabaseToggleLike } from '@/api/supabaseTrackLikeApi';
import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PiHeartStraightDuotone, PiHeartStraightFill } from 'react-icons/pi';
import { Bounce, toast } from 'react-toastify';

interface ToggleLikeButtonProps {
  trackId: string;
}

function LikeButton({ trackId }: ToggleLikeButtonProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLike, setIsLike] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.id;
  const queryClient = useQueryClient();

  const { data: myLikeOnTrack } = useQuery({
    queryKey: ['isLike', { trackId }],
    queryFn: async () =>
      await supabase
        .from('likeMusic')
        .select('*')
        .eq('trackId', trackId)
        .eq('userId', userId!)
        .single(),
    enabled: !!userId,
    select: (response) => response.data,
  });

  const { mutate: toggleLikeTracks } = useMutation({
    mutationFn: async (trackId: string) => {
      if (!currentUser) return toast.error('로그인이 필요한 서비스 입니다');

      if (!isLike) {
        const data = {
          userId: String(userId),
          trackId: String(trackId),
        };
        await supabaseToggleLike.likeTrack(data);
        setIsLike(true);
        toast.success('트랙을 좋아요 하셨습니다', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      } else {
        await supabaseToggleLike.unLikeTrack(trackId);
        setIsLike(false);
        toast.info('트랙 좋아요를 취소 하셨습니다', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['isLike', { trackId }] }),
  });

  useEffect(() => {
    if (!myLikeOnTrack) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  }, [isLoggedIn, myLikeOnTrack]);

  return (
    <div className="w-14 h-14 text-center justify-center">
      <button
        className="pl-2.5 border border-white w-full h-full rounded-full text-white transition-all duration-300 hover:scale-110  text-4xl"
        onClick={() => toggleLikeTracks(trackId)}
      >
        {!isLike ? <PiHeartStraightDuotone /> : <PiHeartStraightFill />}
      </button>
    </div>
  );
}

export default LikeButton;
