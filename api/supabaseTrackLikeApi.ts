import { Database } from '@/database.types';
import { supabase } from '@/supabase/client';

/**
 *
 * @param data : { userId : string, trackId: string }
 * @returns 수파베이스에 좋아요 넣기
 */
const likeTrack = async (
  data: Database['public']['Tables']['likeMusic']['Insert'],
) => {
  await supabase.from('likeMusic').insert(data);
};

/**
 *
 * @param trackId
 * @returns 수파베이스에서 좋아요 삭제
 */
const unLikeTrack = async (trackId: string) => {
  const response = await supabase
    .from('likeMusic')
    .delete()
    .eq('trackId', trackId);
  const data = response.data;
  return data;
};

export const supabaseToggleLike = {
  likeTrack,
  unLikeTrack,
};
