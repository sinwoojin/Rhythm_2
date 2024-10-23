import { Tables } from '@/database.types';
import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';

/**
 *
 * @param trackId
 * @returns 수파베이스에 좋아요 넣기
 */
const likeTrack = async (trackId: string) => {
  const userId = useAuthStore((state) => state.currentUser?.id);
  const data: Tables<'likeMusic'> = {
    userId: String(userId),
    trackId,
  };
  await supabase.from('likeMusic').insert(data);
};

const unLikeTrack = async (trackId: string) => {
  const userId = useAuthStore((state) => state.currentUser?.id);
  const data: Tables<'likeMusic'> = {
    userId: String(userId),
    trackId,
  };
  await supabase.from('likeMusic').delete(data);
};

export const supabaseToggleLike = {
  likeTrack,
  unLikeTrack,
};
