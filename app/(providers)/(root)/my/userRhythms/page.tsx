'use client';

import { deleteUserRhythm } from '@/api/supabaseGetCategories';
import { supabaseProfile } from '@/api/supabaseProfile';
import { useAuthStore } from '@/zustand/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Page from '../../_components/Page/Page';

function UserRhythms() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = String(currentUser?.id);

  const queryClient = useQueryClient();

  // React Query로 사용자 추천 리듬 목록 가져오기
  const {
    data: myRhythms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userRhythms'],
    queryFn: async () => await supabaseProfile.getMyRecommend(userId),
    enabled: !!userId,
  });

  const { mutate: handleClickDeleteUserRhythm } = useMutation({
    mutationFn: async ({
      userId,
      rhythmId,
    }: {
      userId: string;
      rhythmId: number;
    }) => {
      await deleteUserRhythm(userId, rhythmId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userRhythms'],
      });
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error?.message}</div>;

  return (
    <Page isNav={true} title="리듬">
      {!currentUser ? (
        <div>로그인 되지 않음</div>
      ) : (
        <ul className="flex flex-wrap gap-x-[2%] gap-y-3">
          {myRhythms?.length === 0 ? (
            <li>작성한 글이 없습니다</li>
          ) : (
            myRhythms
              ?.filter((rhythm) => rhythm.userId === userId) // 사용자 ID가 같은 리듬 항목만 필터링
              .map((rhythm) => (
                <li
                  key={rhythm.id}
                  className="flex flex-col gap-x-4 gap-y-2 w-[18%] aspect-square p-5 duration-300 transition-all hover:bg-white/20"
                >
                  <div className="relative h-full aspect-square rounded-md bg-white/20 overflow-hidden group">
                    <div className="absolute w-full h-full p-2 bg-black/60 opacity-0 duration-300 transition-all group-hover:opacity-100">
                      <div className="flex gap-x-2 items-center">
                        <li className="w-10 h-10 bg-white/20 rounded-full overflow-hidden">
                          <img
                            src={rhythm.trackImgURL}
                            alt={rhythm.userName}
                            className="w-full h-full object-cover"
                          />
                        </li>
                        <p className="text-white font-semibold line-clamp-1">
                          {rhythm.userName}
                        </p>

                        {currentUser.id === rhythm.userId ? (
                          <button
                            onClick={() =>
                              handleClickDeleteUserRhythm({
                                userId: String(rhythm.userId),
                                rhythmId: Number(rhythm.id),
                              })
                            }
                            className="absolute bottom-0 right-0 p-2 text-[12px] font-semibold text-red-500/60 duration-200 active:brightness-90 hover:text-red-500"
                          >
                            remove
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <img
                      src={rhythm.trackImgURL}
                      alt={rhythm.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <p className="font-bold text-white/80 line-clamp-1">
                      {rhythm.title}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="line-clamp-2 text-white/40 text-sm w-[60%] py-3 truncate">
                        {rhythm.content}
                      </p>
                      <p className="w-[30%] text-end truncate">
                        {rhythm.category}
                      </p>
                    </div>
                  </div>
                </li>
              ))
          )}
        </ul>
      )}
    </Page>
  );
}

export default UserRhythms;
