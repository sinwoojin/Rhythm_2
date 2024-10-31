'use client';

import { getAllUserRhythm } from '@/api/supabaseGetCategories';
import { baseURL } from '@/config/config';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

function UserRhythm() {
  const { data: getUserRhythms } = useQuery({
    queryKey: ['userRhythms'],
    queryFn: () => getAllUserRhythm(),
  });

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold mb-6">최신 RHYTHM</h3>
      <Swiper
        spaceBetween={10}
        slidesPerView={5.5}
        loop={false}
        className="overflow-hidden"
      >
        <ul className="flex gap-x-5">
          {getUserRhythms?.map((userRhythm) => (
            <SwiperSlide
              key={userRhythm.id}
              className="w-[200px] p-4 bg-white/20"
            >
              <Link
                href={`/userRhythm/${userRhythm.category}/${userRhythm.id}`}
              >
                <div className="relative group w-full aspect-square rounded-md overflow-hidden">
                  <img
                    aria-label="플레이 리스트 커버 이미지"
                    src={userRhythm.trackImgURL}
                    alt="플레이 리스트 커버 이미지"
                    className="w-full h-full object-cover group-hover:brightness-50"
                  />
                  <div className="absolute top-2 left-4 w-full flex items-center gap-x-3 opacity-0 group-hover:opacity-90">
                    <div className="w-[30px] h-[30px] aspect-square gap-x-3 rounded-full overflow-hidden">
                      <img
                        aria-label="유저 프로필 이미지"
                        src={baseURL + userRhythm.author?.imgUrl}
                        alt="유저 프로필 이미지"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="flex flex-col gap-1 truncate"
                      aria-label="content-box"
                    >
                      <p className="text-md font-semibold truncate">
                        {userRhythm.userName}
                      </p>
                      <p className="text-xs truncate">
                        {dayjs(userRhythm.createdAt).format('YYYY-MM-DD')}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-2 font-semibold truncate">
                  {userRhythm.title}
                </p>
                <p className="text-sm text-white/80 truncate">
                  {userRhythm.content}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    </div>
  );
}

export default UserRhythm;
