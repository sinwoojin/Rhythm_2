import Button from '@/components/Button';
import Input from '@/components/Input';
import React, { useState } from 'react';

function MusicPostAddModal() {
  const [isSongListOpen, setIsSongListOpen] = useState(false);

  const handleSubmitNewMusicPost = () => {};

  // 버튼 클릭 시 창 표시 상태 토글
  const handleToggleSongList = () => {
    setIsSongListOpen((prev) => !prev);
    console.log('isSongListOpen', isSongListOpen);
  };
  return (
    <div
      className="absolute flex gap-x-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-[#121212] rounded-2xl w-[700px] h-[480px] py-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10">
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
            노래 추가하기 +
          </Button>

          <Input
            className="w-[400px] text-center"
            size={'lg'}
            padding={'md'}
            id="title"
            placeholder="음악 추천의 제목을 적어주세요."
          />

          <Input
            className="w-[400px] text-center"
            size={'lg'}
            padding={'md'}
            id="comments"
            placeholder="음악 추천의 내용을 적어주세요."
          />
          <Button
            size={'lg'}
            className="border border-white bg-[#121212] text-white hover:-translate-y-2 transition-all px-4 py-4 w-[400px]"
          >
            음악 추천글 작성하기
          </Button>
        </form>
      </div>
      <div
        className={`bg-[#121212] flex flex-col gap-y-4 pb-14 items-center rounded-2xl w-[300px] h-[480px] py-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-500 opacity-0 ${
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
        >
          노래 추가하기 +
        </Button>

        {/* 노래 추가하기 버튼을 누르면 보여주는 내가 좋아요 표시한 노래들 */}
        <ul className="flex flex-col w-[200px] max-h-full overflow-auto scrollbar-hide bg-white/20 rounded-md">
          {/* 여기있는 li를 map돌려주면 됨 */}
          <li className="px-3 py-3 h-[66px] w-full rounded-sm transition-all hover:bg-white/10 relative">
            <div className="w-full h-full absolute top-0 left-0 right-0 bg-black/70 z-10 text-xl font-bold grid place-items-center opacity-0 focus:opacity-100">
              선택됨
            </div>
            <button className="h-full w-full flex gap-x-3 items-center">
              <div className="h-full aspect-square bg-white/50">
                {/* <img className="w-full h-full overflow-hidden" src="" alt="" /> */}
              </div>
              <div className="flex">
                <div className="w-full flex flex-col">
                  <span className="font-semibold line-clamp-1">노래 제목</span>
                  <span className="text-white/50 text-sm line-clamp-1">
                    가수 이름
                  </span>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MusicPostAddModal;
