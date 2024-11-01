'use client';

import { api } from '@/api/spotifyApi';
import { baseURL } from '@/config/config';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

function Users() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUser.getUserProfiles(),
  });

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold mb-6">사용자 목록</h3>
      <Swiper
        spaceBetween={10}
        slidesPerView={5.5}
        loop={false}
        className="overflow-hidden"
      >
        <ul className="w-full flex gap-x-7">
          {users?.map((user) => (
            <SwiperSlide
              key={user.id}
              className="w-[200px] p-5 bg-white/20 rounded-3xl"
            >
              <Link href={`/profiles/${user.id}`}>
                <div className="relative group w-full aspect-square rounded-md p-5">
                  <img
                    src={baseURL + user.imgUrl}
                    alt="플레이 리스트 커버 이미지"
                    className="w-full h-full object-cover rounded-full group-hover:brightness-50 "
                  />
                </div>
                <div id="content-box" className="border-t border-white py-3">
                  <p className="font-semibold text-lg truncate ">
                    {user.userName}
                  </p>
                  <p className="text-sm text-white/80 truncate ">
                    {user.content}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    </div>
  );
}

export default Users;
