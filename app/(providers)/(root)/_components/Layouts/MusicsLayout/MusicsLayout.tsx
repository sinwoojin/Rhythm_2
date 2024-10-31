'use client';
import { Track } from '@/schema/type';
import { motion } from 'framer-motion';
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
      <div className="mt-4[&+&]:mt-20 relative max-w-full">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        {tracks && tracks.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={5.5}
            loop={false}
            className="overflow-hidden"
          >
            <ul className="flex gap-x-4 overflow-hidden scrollbar-hide max-w-full">
              {tracks.map((track) => (
                <SwiperSlide key={track.id}>
                  <Link href={`/tracks/${track.id}`}>
                    <div className="w-full aspect-square overflow-hidden mb-2">
                      <img
                        id="overFlowSlide"
                        className="w-full h-full object-cover"
                        src={track.album.images[0]?.url || '/default-image.jpg'}
                        alt="이미지"
                      />
                    </div>
                    <motion.div className="overflow-hidden w-full group">
                      <motion.p
                        whileHover={track.name.length > 18 ? { x: -100 } : {}} // 15자 이상일 때만 왼쪽으로 이동
                        animate={{ x: 0 }} // 호버가 끝나면 원래 위치로 돌아옴
                        transition={{
                          type: 'tween',
                          duration: 3,
                        }}
                        className="text-xl font-semibold whitespace-nowrap "
                      >
                        {track.name}
                      </motion.p>
                    </motion.div>
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
