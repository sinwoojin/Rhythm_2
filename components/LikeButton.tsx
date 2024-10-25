'use client';

import { supabaseToggleLike } from '@/api/supabaseTrackLikeApi';
import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PiHeartStraightDuotone, PiHeartStraightFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

interface ToggleLikeButtonProps {
  trackId: string;
  hasBorder: boolean;
}

function LikeButton({ trackId, hasBorder }: ToggleLikeButtonProps) {
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
      } else {
        await supabaseToggleLike.unLikeTrack(trackId);
        setIsLike(false);
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
    <button
      className={cx('w-14 h-14 rounded-full text-white transition-all', {
        'border border-white': hasBorder === true,
      })}
      onClick={() => toggleLikeTracks(trackId)}
    >
      <motion.div
        className="w-full h-full text-center text-4xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
      >
        {!isLike ? <PiHeartStraightDuotone /> : <PiHeartStraightFill />}
      </motion.div>
    </button>
  );
}

export default LikeButton;
