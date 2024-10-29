'use client';

import { supabaseProfile } from '@/api/supabaseProfile';
import Input from '@/components/Input';
import { baseURL } from '@/config/config';
import { Database } from '@/database.types';
import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { ComponentProps, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type EditModalProps = {
  id: string;
};

function EditModal({ id }: EditModalProps) {
  // table에 들어있는 정보 가져오기, 지정하기
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>('');

  const queryClient = useQueryClient();

  // 현재 유저 정보
  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const profileId = currentUser?.id;

  // 모달 닫기
  const closeModal = useModalStore((state) => state.closeModal);

  // 이미지 정보 가져오기
  const handleChangeFileInput: ComponentProps<'input'>['onChange'] = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return setImage(null); // 파일이 없을 때 처리
    }

    const file = files[0];

    const previewProfile = URL.createObjectURL(file);
    setImage(file);
    setPreviewProfile(previewProfile);
  };

  // 프로필 수정 버튼
  const { mutate: handleSubmitModifyDeal } = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      let imageUrl = String(currentUser?.imgUrl);

      if (image) {
        const uploadImage = await supabase.storage
          .from('img')
          .upload(nanoid(), image, { upsert: true });

        imageUrl = String(uploadImage.data?.fullPath);
      }

      const data: Database['public']['Tables']['users']['Update'] = {
        userName,
        content: String(content),
        imgUrl: imageUrl,
      };

      const response = await supabaseProfile.updateProfile(data, id);

      if (response.error) {
        return toast.error('프로필 수정에 실패했습니다!...');
      } else {
        toast.success('프로필 수정에 성공했습니다!');
        setCurrentUser({ ...currentUser, ...data });
        closeModal();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', profileId] });
    },
  });

  // 현재 프로필의 정보 가져오기
  useEffect(() => {
    (async () => {
      const response = await supabaseProfile.getProfile(id);

      if (response) {
        setUserName(response.userName);
        setContent(String(response.content));
        setPreviewProfile(baseURL + response.imgUrl);
      }
    })();
  }, [id]);

  return (
    <div
      className="absolute top-[50%] left-[50%] w-[700px] h-[500px] bg-rhythm -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white"
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
              className="w-0 h-0 p-0 overflow-hidden border absolute"
              type="file"
              id="profileImg"
              onChange={(e) => handleChangeFileInput(e)}
            />
            <img
              alt="프리뷰 이미지"
              src={previewProfile!}
              className="z-0 w-full h-full absolute top-0  rounded-full object-cover group-hover:brightness-50"
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
              size={'lg'}
              padding={'md'}
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label htmlFor="content">소개글</label>
            <Input
              className="mt-2"
              size={'lg'}
              padding={'md'}
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <button className="border border-white bg-rhythm text-white w-[400px] h-[60px] mt-5 hover:-translate-y-2 transition-all">
          정보 수정하기
        </button>
      </form>
    </div>
  );
}

export default EditModal;
