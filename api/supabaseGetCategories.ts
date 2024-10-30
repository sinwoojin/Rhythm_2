import { supabase } from '@/supabase/client';

export const getCategories = async () => {
  const { data: categories } = await supabase.from('category').select('*');

  return categories;
};

export const getCategory = async (name: string) => {
  const { data: category } = await supabase
    .from('category')
    .select('*')
    .eq('name', name)
    .single();

  return category;
};

/**
 * 카테고리별 커뮤니티글 가져오기
 * @param rhythmCategory
 * @returns
 */
export const getUserRhythms = async (rhythmCategory: string) => {
  const response = await supabase
    .from('userRhythm')
    .select('*, author:users (*)')
    .eq('category', rhythmCategory)
    .order('createdAt', { ascending: false });

  const data = response.data;

  return data;
};

/**
 *
 * @returns 유저들이 만든 리듬 페이지 목록 데이터
 */
export const getAllUserRhythm = async () => {
  const response = await supabase
    .from('userRhythm')
    .select('*, author:users (*)')
    .order('createdAt', { ascending: false });

  const data = response.data;

  return data;
};

/**
 * 클릭한 유저 리듬 삭제
 * @param userId
 * @param rhythmId
 * @returns
 */
export const deleteUserRhythm = async (userId: string, rhythmId: number) => {
  const response = await supabase
    .from('userRhythm')
    .delete()
    .eq('userId', userId)
    .eq('id', rhythmId);

  const data = response.data;
  return data;
};
