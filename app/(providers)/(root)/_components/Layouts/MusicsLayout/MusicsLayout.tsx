'use client';
import { Track } from '@/schema/type';
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Page from '../../Page/Page';

interface ChartListProps {
  tracks: Track[];
  title: string;
}

function MusicsLayout({ tracks, title }: ChartListProps) {
  return (
    <>
      <div className="[&+&]:mt-20 relative max-w-full">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        {tracks && tracks.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={7}
            loop={false}
            className="overflow-hidden"
          >
            <ul className="flex gap-x-4 overflow-hidden scrollbar-hide max-w-full">
              {tracks.map((track) => (
                <SwiperSlide key={track.id}>
                  <Link href={`/tracks/${track.id}`}>
                    <div className="w-full aspect-square overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={track.album.images[0]?.url || '/default-image.jpg'}
                        alt="이미지"
                      />
                    </div>
                    <p className="text-xl font-semibold line-clamp-1">
                      {track.name}
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
            </ul>
          </Swiper>
        ) : (
          <Page>검색 결과가 존재하지 않습니다</Page>
        )}
      </div>
    </>
  );
}

export default MusicsLayout;
