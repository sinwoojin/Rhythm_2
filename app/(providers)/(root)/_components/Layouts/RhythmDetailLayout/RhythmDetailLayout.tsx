import Link from 'next/link';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

function RhythmDetailLayout() {
  return (
    <div>
      <ul className="flex flex-wrap gap-2 w-[calc(100%-120px)]">
        {/* 여기 list를 map 돌리면 됨 */}
        <li className="flex flex-col gap-x-4 gap-y-2 w-[calc((100%-24px)/4)] p-5 duration-300 transition-all hover:bg-white/20">
          <div className="relative h-full aspect-square rounded-md bg-white/20 overflow-hidden group">
            <div className="absolute w-full h-full p-2 bg-black/80 opacity-0 duration-300 transition-all group-hover:opacity-100">
              <div className="flex gap-x-2 items-center">
                <Link
                  href={`profile/글쓴이 ID`}
                  className="w-10 h-10 bg-white/20 rounded-full overflow-hidden"
                >
                  {/* <img src="사용자 프로필 이미지" alt="사용자 이름" className='w-full h-full object-cover' /> */}
                </Link>
                <p className="text-white font-semibold line-clamp-1">
                  사용자 이름
                </p>
              </div>
            </div>
            {/* 버튼 누르면 바로 재생 */}
            <button className="absolute bottom-2 left-1/2 -translate-x-1/2 text-red-500 text-xs opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-xl">
              <FaPlay />
            </button>
            {/* <img src="노래 이미지" alt="노래 이름" className='w-full h-full object-cover' /> */}
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="text-white/80 line-clamp-1">
              <span className="font-bold">노래 제목</span>/
              <span className="text-xs font-semibold">가수 이름</span>
            </div>
            <p className="line-clamp-2 text-white/40 text-sm">노래 소개 내용</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default RhythmDetailLayout;
