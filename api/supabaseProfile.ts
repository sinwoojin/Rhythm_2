import { supabase } from '@/supabase/client';

/**
 * 현재 프로필 정보 가져오기
 * @param profileId
 * @returns
 */
export const getProfile = async (profileId: string) => {
  const response = await supabase
    .from('users')
    .select('*')
    .eq('id', profileId)
    .single();

  const data = response.data;

  return data;
};

/**
 * supabase 팔로워 목록 가져오기
 * @param profileId
 * @returns
 */
export const getFollowers = async (profileId: string) => {
  const response = await supabase
    .from('follow')
    .select('*')
    .eq('following', profileId);
  const data = response.data;

  return data;
};

/**
 * supabase 팔로잉 목록 가져오기
 * @param profileId
 */
export const getFollowing = async (profileId: string) => {
  const response = await supabase
    .from('follow')
    .select('*')
    .eq('follower', profileId);
  const data = response.data;

  return data;
};

/**
 * 팔로우 기능
 * @param data
 * @returns
 */
export const insertFollowData = async (data: {
  follower: string;
  following: string;
}) => {
  const response = await supabase.from('follow').insert(data);
  const follow = response.data;

  return follow;
};

/**
 * 언팔로우 기능
 *
 * follower: 내 id, following: 내가 팔로우 취소하는 유저 id
 * @param follower
 * @param following
 * @returns
 */
export const deleteFollowData = async (follower: string, following: string) => {
  const response = await supabase
    .from('follow')
    .delete()
    .eq('follower', follower)
    .eq('following', following);

  const data = response.data;

  return data;
};

/**
 * 현재 나의 팔로우 상태 지정
 *
 * follower: 현재 로그인 id, following: 프로필 페이지 id
 * @param follower
 * @param following
 */
export const myFollowState = async (follower: string, following: string) => {
  const response = await supabase
    .from('follow')
    .select('*')
    .eq('follower', follower)
    .eq('following', following);

  const data = response.data;

  return data;
};

/**
 * 프로필 업데이트 기능
 *
 * id: 현재 프로필 id
 *
 * 값이 들어가는게 필수는 아님
 * @param data
 * @param id
 */
export const updateProfile = async (
  data: {
    content?: string | null;
    createdAt?: string;
    email?: string;
    id?: string;
    imgUrl?: string | null;
    userName?: string;
  },
  id: string,
) => {
  const response = await supabase.from('users').update(data).eq('id', id);

  return response;
};

export const supabaseProfile = {
  getProfile,
  getFollowers,
  getFollowing,
  insertFollowData,
  deleteFollowData,
  myFollowState,
  updateProfile,
};
