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

const unLikeTrack = async (trackId: string) => {
  await supabase.from('likeMusic').delete().eq('trackId', trackId);
};

export const supabaseToggleLike = {
  likeTrack,
  unLikeTrack,
};
