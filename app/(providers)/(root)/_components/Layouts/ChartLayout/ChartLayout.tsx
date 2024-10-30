'use client';
import { Track } from '@/schema/type';
import { chunk } from 'lodash';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/grid';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ChartProps {
  tracks: Track[];
  title: string;
}

function ChartLayout({ title, tracks }: ChartProps) {
  const trackChunks = chunk(tracks, 5); // 트랙을 5개씩 그룹화

  return (
    <div className="[&+&]:mt-16 py-6 px-6">
      <h2 className="font-bold text-2xl mb-6">{title}</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={3.5} // 세로로 3개의 슬라이드 보기
        loop={false}
        className="overflow-hidden grid grid-rows-3 gap-x-5 grid-flow-col gap-y-4 overflow-x-auto scrollbar-hide w-full"
      >
        {trackChunks.map((trackGroup, groupIdx) => (
          <SwiperSlide key={trackGroup[0].id}>
            <div className="grid grid-col-1 gap-y-2">
              {trackGroup.map((track, trackIdx) => (
                <Link
                  key={track.id}
                  href={`/tracks/${track.id}`}
                  className="w-full h-[50px] mr-5 flex gap-x-5"
                >
                  <div className="h-full aspect-square bg-white">
                    <img
                      src={track.album.images[0]?.url}
                      alt={track.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* 전체 인덱스를 계산하여 표시 */}
                  <div className="h-full">
                    <p className="font-bold text-center">
                      {groupIdx * 5 + trackIdx + 1}
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-y-[2px]">
                    <p className="font-bold line-clamp-1">{track.name}</p>
                    <p className="text-sm text-white/50 line-clamp-1">
                      {track.artists[0]?.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ChartLayout;
