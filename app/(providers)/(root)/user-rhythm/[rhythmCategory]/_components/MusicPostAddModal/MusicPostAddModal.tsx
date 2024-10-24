import Input from '@/components/Input';
import React from 'react';

function MusicPostAddModal() {
  const handleSubmitNewMusicPost = () => {};
  return (
    <div
      className="absolute top-[50%] left-[50%] w-[700px] h-[500px] bg-[#121212] -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-center mt-10 font-semibold text-3xl mb-4">
        노래 추천글
      </h2>
      <form
        className="flex items-center justify-center  gap-y-3  flex-wrap"
        onSubmit={handleSubmitNewMusicPost}
      >
        <section className="flex w-2/3 gap-x-6 items-center">
          <div className="flex flex-col w-full">
            <label htmlFor="userName">제목</label>
            <Input
              className="mb-4 mt-2"
              size={'large'}
              padding={'md'}
              id="userName"
            />

            <label htmlFor="content">글</label>
            <label htmlFor="content"></label>
            <Input
              className="mt-2"
              size={'large'}
              padding={'md'}
              id="content"
            />
          </div>
        </section>
        <button className="border border-white bg-[#121212] text-white w-[400px] h-[60px] mt-5 hover:-translate-y-2 transition-all">
          노래 추천글 작성하기
        </button>
      </form>
    </div>
  );
}

export default MusicPostAddModal;
