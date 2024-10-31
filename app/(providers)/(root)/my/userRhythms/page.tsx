'use client';

import { supabaseProfile } from '@/api/supabaseProfile';
import { useAuthStore } from '@/zustand/authStore';
import { useQuery } from '@tanstack/react-query';
import Page from '../../_components/Page/Page';

function UserRhythms() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = String(currentUser?.id);

  // React Query로 사용자 추천 리듬 목록 가져오기
  const {
    data: myRhythms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userWriteRhythms', userId],
    queryFn: async () => await supabaseProfile.getMyRecommend(userId),
    enabled: !!userId,
  });

  console.log('myRhythms', myRhythms); // myRhythms 데이터 로그 확인

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <Page isNav={true} title="리듬">
      {!currentUser ? <div>로그인 되지 않음</div> : <div>hi</div>}
      <ul>
        {myRhythms
          ?.filter((rhythms) => rhythms.userId === userId) // 사용자 ID가 같은 리듬 항목만 필터링
          .map((rhythm) => (
            <li key={rhythm.id}>
              <p>{rhythm.title}</p>
            </li>
          ))}
      </ul>
    </Page>
  );
}

export default UserRhythms;
