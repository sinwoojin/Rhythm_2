'use client';

import { getAllUserRhythm } from '@/api/supabaseGetCategories';
import { baseURL } from '@/config/config';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';

function UserRhythm() {
  const { data: getUserRhythms } = useQuery({
    queryKey: ['userRhythms'],
    queryFn: () => getAllUserRhythm(),
  });

  return (
    <div className="mt-20">
      <ul className="flex gap-x-5">
        {getUserRhythms?.map((userRhythm) => (
          <li
            key={userRhythm.id}
            className="w-[200px] border border-white p-4 "
          >
            <div className="relative group">
              <Link href={`/userRhythm/${userRhythm.category}`}>
                <img
                  aria-label="플레이 리스트 커버 이미지"
                  src={userRhythm.trackImgURL}
                  alt="플레이 리스트 커버 이미지"
                  className="w-full aspect-square object-cover group-hover:brightness-75"
                />
                <div className="absolute top-0 right-1 flex items-center gap-x-3 opacity-0 group-hover:opacity-90">
                  <div className="w-[30px] h-[30px] aspect-square gap-x-3">
                    <img
                      aria-label="유저 프로필 이미지"
                      src={baseURL + userRhythm.author?.imgUrl}
                      alt="유저 프로필 이미지"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className=" truncate" aria-label="content-box">
                    <p className="text-md truncate">{userRhythm.userName}</p>
                    <p className="text-xs truncate">
                      {dayjs(userRhythm.createdAt).format('YYYY-MM-DD')}
                    </p>
                  </div>
                </div>
                <h2 className="mt-2 truncate">{userRhythm.title}</h2>
                <p className="truncate">{userRhythm.content}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserRhythm;
