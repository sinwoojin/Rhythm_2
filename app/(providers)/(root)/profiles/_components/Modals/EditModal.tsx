'use client';

import Input from '@/components/Input';
import { Database } from '@/database.types';
import { supabase } from '@/supabase/client';
import { useModalStore } from '@/zustand/modalStore';
import { nanoid } from 'nanoid';
import { ComponentProps, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type EditModalProps = {
  id: string;
  userUpdate: (loginUserId: string) => void;
};

function EditModal({ id, userUpdate }: EditModalProps) {
  // table에 들어있는 정보 가져오기, 지정하기
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>('');

  const closeModal = useModalStore((state) => state.closeModal);

  // 이미지 정보 가져오기
  const handleChangeFileInput: ComponentProps<'input'>['onChange'] = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return setImage(null); // 파일이 없을 때 처리
    }

    const file = files[0]; // 첫 번째 파일 가져오기
    const previewProfile = URL.createObjectURL(file); // 첫 번째 파일로 URL 생성

    setImage(file); // 파일 상태 저장
    setPreviewProfile(previewProfile); // 미리보기 URL 저장
  };

  // 글 수정하기
  const handleSubmitModifyDeal = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!image) return alert('이미지를 업로드해주세요!');
    if (!userName) return alert('유저 이름을 작성해주세요!');
    if (!content) return alert('소개글 내용을 작성해주세요!');

    const uploadImage = await supabase.storage
      .from('img')
      .upload(nanoid(), image, { upsert: true });

    const imageUrl = uploadImage.data?.fullPath;

    const data: Database['public']['Tables']['users']['Update'] = {
      userName,
      content,
      imgUrl: imageUrl,
    };

    const response = await supabase.from('users').update(data).eq('id', id);

    if (response.error) {
      return toast.warn('프로필 수정에 실패했습니다!...');
    } else {
      toast.success('프로필 수정에 성공했습니다!');
      closeModal();
      userUpdate(id);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (response.data) {
        setUserName(response.data.userName);
        setContent(String(response.data.content));
      }
    })();
  }, [id]);

  console.log('previewProfile', previewProfile);

  return (
    <div
      className="absolute top-[50%] left-[50%] w-[700px] h-[500px] bg-[#121212] -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-center mt-10 font-semibold text-3xl mb-4">
        프로필 수정
      </h2>
      <form
        className="flex items-center justify-center  gap-y-3  flex-wrap"
        onSubmit={handleSubmitModifyDeal}
      >
        <section className="flex w-2/3 gap-x-6 items-center">
          <div className="relative h-full flex w-2/3 text-center gap-y-3 group aspect-square">
            <input
              className="w-0 h-0 p-0 overflow-hidden border border-0 absolute"
              type="file"
              id="profileImg"
              onChange={(e) => handleChangeFileInput(e)}
            />
            <img
              src={previewProfile!}
              className="z-0 w-full h-full absolute top-0  rounded-full object-cover group-hover:brightness-75"
            />
            <label
              htmlFor="profileImg"
              className="z-50 absolute -top-96 left-1/3 opacity-0 group-hover:top-5 group-hover:opacity-100 transition-opacity duration-300 text-white"
            >
              <span className=" border-b cursor-pointer font-bold text-white">
                사진 변경
              </span>
            </label>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="userName">유저 이름</label>
            <Input
              className="mb-4 mt-2"
              size={'large'}
              padding={'md'}
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label htmlFor="content">소개글</label>
            <Input
              className="mt-2"
              size={'large'}
              padding={'md'}
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <button className="border border-white bg-[#121212] text-white w-[400px] h-[60px] mt-5 hover:-translate-y-2 transition-all">
          정보 수정하기
        </button>
      </form>
    </div>
  );
}

export default EditModal;
