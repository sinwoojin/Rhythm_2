import { api } from '@/api/spotifyApi';
import { supabaseProfile } from '@/api/supabaseProfile';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Database } from '@/database.types';
import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface MusicPostAddModal {
  rhythmCategory: string;
}

function MusicPostAddModal({ rhythmCategory }: MusicPostAddModal) {
  // State
  const [isSongListOpen, setIsSongListOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [trackId, setTrackId] = useState('');
  const [trackUri, setTrackUri] = useState('');
  const [trackImgURL, setTrackImgURL] = useState('');
  const [trackName, setTrackName] = useState('노래 추가하기 +');

  const currentUser = useAuthStore((state) => state.currentUser);

  const closeModal = useModalStore((state) => state.closeModal);

  const queryClient = useQueryClient();

  const userId = String(currentUser?.id);
  const userName = String(currentUser?.userName);

  // 좋아요 표시한 트랙
  const { data: myLikeTracks } = useQuery({
    queryKey: ['userLikeTracks', userId],
    queryFn: () => supabaseProfile.getMyLikeTracks(userId),
    placeholderData: keepPreviousData,
  });

  // 좋아요 표시한 트랙 뿌리기
  const { data: tracks } = useQuery({
    queryKey: ['tracks', userId],
    queryFn: async () => {
      const trackIds = myLikeTracks?.map((item) => item.trackId);
      if (!trackIds) return;
      const ids = trackIds.map((item) => item);
      return api.track.getTracks(ids);
    },
  });

  // 음악 추천글 작성
  const { mutate: handleSubmitNewMusicPost } = useMutation({
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();

      const data: Database['public']['Tables']['userRhythm']['Insert'] = {
        userId,
        userName,
        trackId,
        trackImgURL,
        title,
        content,
        category: rhythmCategory,
        trackUri,
      };

      const response = await supabase.from('userRhythm').insert(data);

      if (response) {
        toast.success('글 작성에 성공하셨습니다!');
        closeModal();
      } else {
        toast.error('글 작성에 실패하셨습니다...');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userRhythms', { category: rhythmCategory }],
      });
    },
  });

  // 트랙 선택하기
  const handleClickAddTrack = (
    trackId: string,
    trackName: string,
    trackImgUrl: string,
    trackUri: string,
  ) => {
    setTrackId(trackId);
    setTrackName(trackName);
    setIsSongListOpen((prev) => !prev);
    setTrackImgURL(trackImgUrl);
    setTrackUri(trackUri);
  };

  // 트랙 선택 초기화 버튼
  const handleClickResetButton = () => {
    setTrackName('노래 추가하기 +');
    setTrackId('');
    setTrackImgURL('');
    setTrackUri('');
  };

  // 버튼 클릭 시 창 표시 상태 토글
  const handleToggleSongList = () => {
    setIsSongListOpen((prev) => !prev);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['tracks', userId] });
  }, [queryClient, userId]);

  return (
    <div
      className="absolute flex gap-x-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-rhythmBlack rounded-2xl w-[700px] h-[480px] py-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10">
        <h2 className="text-center mb-10 font-semibold text-3xl">음악 추천</h2>
        <form
          className="flex flex-col items-center gap-y-6"
          onSubmit={handleSubmitNewMusicPost}
        >
          {/* 노래 추가하기 버튼 누르면 오른쪽에 노래 추가하는 창이 뜸 */}
          <Button
            onClick={handleToggleSongList}
            type="button"
            className="text-[#b3b3b3] px-4 py-4 font-bold w-[400px]"
            size={'lg'}
          >
            {trackName}
          </Button>

          <Input
            className="w-[400px] text-center"
            size={'lg'}
            padding={'md'}
            id="title"
            placeholder="음악 추천의 제목을 적어주세요."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <Input
            className="w-[400px] text-center"
            size={'lg'}
            padding={'md'}
            id="comments"
            placeholder="음악 추천의 내용을 적어주세요."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <Button
            size={'lg'}
            className="border border-white bg-rhythmBlack text-white hover:-translate-y-2 transition-all px-4 py-4 w-[400px]"
          >
            음악 추천글 작성하기
          </Button>
        </form>
      </div>
      <div
        className={`bg-rhythmBlack flex flex-col gap-y-4 pb-14 items-center rounded-2xl w-[300px] h-[480px] py-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-500 opacity-0 ${
          isSongListOpen ? 'left-[calc(520px+50%)] opacity-100' : ''
        }`}
      >
        <h2 className="text-center mb-6 font-semibold text-2xl">
          좋아요 표시한 노래
        </h2>
        <Button
          type="button"
          className="text-[#b3b3b3] px-4 py-4 font-bold w-[200px]"
          size={'lg'}
          onClick={handleClickResetButton}
        >
          노래 선택 취소하기
        </Button>

        {/* 노래 추가하기 버튼을 누르면 보여주는 내가 좋아요 표시한 노래들 */}
        <ul className="flex flex-col w-[200px] max-h-full overflow-auto scrollbar-hide bg-white/20 rounded-md">
          {/* 여기있는 li를 map돌려주면 됨 */}
          {tracks?.map((track) => (
            <li
              className="h-[66px] w-full rounded-sm transition-all hover:bg-white/10"
              key={track.id}
            >
              <button
                className="h-full w-full flex gap-x-3 items-center relative px-3 py-3"
                onClick={() =>
                  handleClickAddTrack(
                    track.id,
                    track.name,
                    track.album.images[0].url,
                    track.uri,
                  )
                }
              >
                <div className="w-full h-full absolute top-0 left-0 right-0 bg-black/70 z-10 text-xl font-bold grid place-items-center opacity-0 focus:opacity-100">
                  선택됨
                </div>
                <div className="h-full aspect-square bg-white/50">
                  <img
                    className="w-full h-full overflow-hidden"
                    src={track.album.images[0].url}
                    alt=""
                  />
                </div>
                <div className="flex">
                  <div className="w-full flex flex-col">
                    <span className="font-semibold line-clamp-1">
                      {track.name}
                    </span>
                    <span className="text-white/50 text-sm line-clamp-1">
                      {track.artists[0].name}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MusicPostAddModal;
