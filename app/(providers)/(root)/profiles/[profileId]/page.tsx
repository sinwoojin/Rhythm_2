'use client';

import { api } from '@/api/spotifyApi';
import { supabaseProfile } from '@/api/supabaseProfile';
import Button from '@/components/Button';
import { baseURL } from '@/config/config';
import { Database } from '@/database.types';
import { User } from '@/schema/type';
import { useAuthStore } from '@/zustand/authStore';
import { useFollowStore } from '@/zustand/followStore';
import { useModalStore } from '@/zustand/modalStore';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Page from '../../_components/Page/Page';
import EditModal from '../_components/Modals/EditModal';
import FollowModal from '../_components/Modals/FollowModal';
import MyLikeTracks from './_components/MyLikeTracks/MyLikeTracks';

interface ProfileDetailPageProps {
  params: {
    profileId: string;
  };
}

function ProfileDetailPage(props: ProfileDetailPageProps) {
  // 유저 정보
  const profileId = props.params.profileId;

  const currentUser = useAuthStore((state) => state.currentUser);
  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();

  // 로그인 상태에 따라 보여주는 버튼의 State
  const [isButtonVisibility, setIsButtonVisibility] = useState(false);

  // 팔로우 상태관리 (zustand)
  const isFollowing = useFollowStore((state) => state.isFollowing);
  const follow = useFollowStore((state) => state.follow);
  const unFollow = useFollowStore((state) => state.unFollow);

  const userId = currentUser?.id;

  // 모달 관련 핸들러
  const handleClickToggleEditModal = () => {
    openModal({
      element: <EditModal id={user!.id} />,
      backdrop: true,
    });
  };

  const handleClickToggleFollowModal = (type: 'followers' | 'following') => {
    openModal({
      element: <FollowModal modalType={type} userId={user!.id} />,
      backdrop: true,
    });
  };

  // 팔로우, 언팔로우 버튼 핸들러
  const handleClickToggleFollowButton = async () => {
    followAction();
  };

  // 팔로워 수 가져오기
  const { data: followers } = useQuery({
    queryKey: ['followers', { userId: profileId }],
    queryFn: () => supabaseProfile.getFollowers(profileId),
    placeholderData: keepPreviousData,
  });

  // 팔로잉 수 가져오기
  const { data: followings } = useQuery({
    queryKey: ['followings', { userId: profileId }],
    queryFn: () => supabaseProfile.getFollowing(profileId),
    placeholderData: keepPreviousData,
  });

  // 유저 정보 가져오기
  const { data: user } = useQuery<User | null>({
    queryKey: ['user', profileId],
    queryFn: () => supabaseProfile.getProfile(profileId),
    placeholderData: keepPreviousData,
  });

  // 팔로우, 언팔로우 기능
  const { mutate: followAction } = useMutation({
    mutationFn: async () => {
      const user = await api.getUser.getUser();
      if (!user) return;

      const follower = user.id;
      const following = profileId;

      if (!isFollowing) {
        if (follower === following)
          return toast.error('자기 자신을 팔로우 할 수 없습니다');

        const data: Database['public']['Tables']['follow']['Insert'] = {
          follower,
          following,
        };

        await supabaseProfile.insertFollowData(data);
        follow();
        toast.info('사용자를 팔로우 하셨습니다.');
      } else {
        await supabaseProfile.deleteFollowData(follower, following);
        unFollow();
        toast.info('사용자를 언팔로우 하셨습니다');
      }
    },
    onSuccess: () => {
      // 팔로워, 팔로잉 수 업데이트
      queryClient.invalidateQueries({
        queryKey: ['followers', { userId: profileId }],
      });
    },
  });

  // 팔로우 상태 확인
  const { mutate: checkingFollow } = useMutation({
    mutationFn: async () => {
      if (!userId) return;

      // 현재 로그인한 사람의 id
      const follower = userId;

      // 현재 프로필 페이지의 id
      const following = profileId;

      // 팔로우 상태 지정
      const data = await supabaseProfile.myFollowState(follower, following);
      if (data && data.length > 0) {
        follow();
      } else {
        unFollow();
      }
    },
    onSuccess: () => {},
  });

  // 유저 정보, 팔로워 ,팔로잉 수 가져오기, 팔로우 상태 확인 실행
  useEffect(() => {
    const fetchData = async () => {
      if (!userId && profileId) return;

      // 수정하기 버튼 띄우기
      const editUser = userId === profileId;
      if (editUser === true) {
        setIsButtonVisibility(true);
      } else {
        setIsButtonVisibility(false);
      }

      // 팔로우 상태 갱신 후 표기
      checkingFollow();
    };

    fetchData();
  }, [profileId, userId, user, isFollowing]);

  return (
    <Page>
      <div className="grid grid-cols-5 gap-x-10 place-items-center border-b border-white/20 pb-16 mb-10">
        <div className="h-[162px] rounded-full aspect-square bg-white opacity-90 overflow-hidden">
          <img
            src={baseURL + user?.imgUrl}
            alt="프로필 이미지"
            className="z-50 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full h-full col-span-2 relative">
          <span>userName: {user?.userName}</span>
          <span className="absolute top-8 p-4">내 소개: {user?.content}</span>
          <span className="bg-white/20 w-full h-full"></span>
        </div>
        <div className="w-full h-full flex flex-col-reverse items-center gap-y-8 col-span-2">
          {isButtonVisibility && (
            <Button
              className="w-full text-center"
              onClick={handleClickToggleEditModal}
            >
              수정하기
            </Button>
          )}

          {isButtonVisibility ? (
            false
          ) : (
            <Button
              className="w-full text-center"
              onClick={handleClickToggleFollowButton}
            >
              {isFollowing ? '언팔로우' : '팔로우'}
            </Button>
          )}

          <div className="flex gap-x-5 w-full">
            <Button
              className="flex flex-col w-full items-center py-4"
              onClick={() => handleClickToggleFollowModal('followers')}
            >
              <span>{followers?.length}명</span>
              <span>팔로워</span>
            </Button>
            <Button
              className="flex flex-col w-full items-center py-4"
              onClick={() => handleClickToggleFollowModal('following')}
            >
              <span>{followings?.length}명</span>
              <span>팔로잉</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <span>나의 플레이리스트</span>
        <div>{/* <PlayLists playListsId={playListsId} /> */}</div>
        <span>좋아요 표시한 노래</span>
        <div>
          <MyLikeTracks profileId={profileId} />
        </div>
      </div>
    </Page>
  );
}

export default ProfileDetailPage;
