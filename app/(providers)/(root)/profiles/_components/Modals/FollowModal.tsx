'use client';

import { api } from '@/api/spotifyApi';
import { supabaseProfile } from '@/api/supabaseProfile';
import Button from '@/components/Button';
import { Database } from '@/database.types';
import { User } from '@/schema/type';
import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Swiper } from 'swiper/react';

interface FollowModalProps {
  userId: string; // 현재 프로필의 유저 ID
  modalType: 'followers' | 'following'; // 모달 타입 추가
}

const FollowModal = ({ userId, modalType }: FollowModalProps) => {
  const queryClient = useQueryClient();

  const closeModal = useModalStore((state) => state.closeModal);

  // 팔로워 목록 상태
  const [followers, setFollowers] = useState<User[]>([]);

  // 팔로우 상태관리 (zustand)
  const currentUser = useAuthStore((state) => state.currentUser);

  // 모달 닫기
  const handleClickModalClose = () => {
    closeModal();
  };

  // 유저별 팔로우 상태 지정
  const { data: myFollowings } = useQuery({
    queryKey: ['follows', { followerId: currentUser!.id! }],
    queryFn: async () =>
      await supabase
        .from('follow')
        .select('*')
        .eq('follower', currentUser!.id!),
    select: (response) => response.data,
  });

  // 유저별 팔로우 상태 지정 (boolean)
  const checkIsFollowing = (userId: string) =>
    !!myFollowings?.find((follow) => follow.following === userId);

  // 팔로워, 팔로잉 목록 가져오는 함수
  const { mutate: fetchFollowData } = useMutation({
    mutationFn: async () => {
      let followData;

      if (modalType === 'followers') {
        // 팔로워 목록 가져오기
        const followers = await supabaseProfile.getFollowers(userId);
        followData = followers?.map((follower) => follower.follower) || [];
      } else {
        // 팔로잉 목록 가져오기
        const followings = await supabaseProfile.getFollowing(userId);
        followData = followings?.map((following) => following.following) || [];
      }

      // 팔로워, 팔로잉의 정보를 가져옴
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .in('id', followData);

      setFollowers(usersData || []);
    },
  });

  // 팔로우, 언팔로우 함수 (미완성)
  const { mutate: handleToggleFollow } = useMutation({
    mutationFn: async (targetUserId: string) => {
      const user = await api.getUser.getUser();
      if (!user) return;

      // 로그인한 유저의 id
      const userId = user?.id;

      // 팔로워, 팔로잉된 유저들의 id
      const followId = targetUserId;

      if (checkIsFollowing(followId) === false) {
        // 팔로우하지 않은 경우 -> 팔로우 처리
        const data: Database['public']['Tables']['follow']['Insert'] = {
          follower: userId,
          following: followId,
        };
        await supabaseProfile.insertFollowData(data);
        const user = await supabase
          .from('users')
          .select('*')
          .eq('id', followId);
        toast.success(`${user.data![0].userName}를 팔로우 했습니다.`);
      } else {
        // 이미 팔로우한 경우 -> 언팔로우 처리
        await supabaseProfile.deleteFollowData(userId, followId);
        const user = await supabase
          .from('users')
          .select('*')
          .eq('id', followId);
        toast.success(`${user.data![0].userName}를 언팔로우 했습니다.`);
      }

      // 데이터 업데이트
      fetchFollowData();
    },

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['followers', { userId: userId }],
      });
      queryClient.refetchQueries({
        queryKey: ['followings', { userId: userId }],
      });
      queryClient.refetchQueries({
        queryKey: ['follows', { followerId: currentUser!.id! }],
      });
    },
  });

  useEffect(() => {
    // 팔로워, 팔로잉 목록 가져오기
    fetchFollowData();
  }, [userId, modalType]);

  return (
    <div
      className="absolute top-[50%] left-[50%] w-[500px] h-[530px] bg-[#121212] -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-black rounded-xl p-10 w-full h-full">
        <h2 className="text-lg font-semibold mb-4">
          {modalType === 'followers' ? '팔로워 목록' : '팔로잉 목록'}
        </h2>
        {followers.length === 0 ? (
          <p>
            {modalType === 'followers'
              ? '팔로워가 없습니다.'
              : '팔로잉이 없습니다.'}
          </p>
        ) : (
          <Swiper spaceBetween={15} slidesPerView={7} loop={false}>
            <ul>
              {followers.map((follower) => (
                <li
                  key={follower.id}
                  className="flex justify-between items-center py-2"
                >
                  <Link href={`/profiles/${follower.id}`}>
                    <span onClick={handleClickModalClose}>
                      {follower.userName}
                    </span>
                  </Link>

                  <Button onClick={() => handleToggleFollow(follower.id)}>
                    {checkIsFollowing(follower.id) ? '언팔로우' : '팔로우'}
                  </Button>
                </li>
              ))}
            </ul>
          </Swiper>
        )}
        <Button className="mt-4 absolute bottom-10" onClick={closeModal}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default FollowModal;
