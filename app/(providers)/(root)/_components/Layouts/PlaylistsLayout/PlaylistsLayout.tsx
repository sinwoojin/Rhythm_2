/* eslint-disable @next/next/no-img-element */
'use client';
import { Track } from '@/schema/type';
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Page from '../../Page/Page';

interface PlaylistsLayoutProps {
  playlists: Track[];
  title: string;
}

function PlaylistsLayout({ playlists, title }: PlaylistsLayoutProps) {
  return (
    <div className="mt-4 relative max-w-full">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      {playlists.length > 0 ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={5.5}
          loop={false}
          className="overflow-hidden"
        >
          {playlists.map((playlist) => (
            <SwiperSlide key={playlist.id}>
              <Link href={`/playlists/${playlist.id}`}>
                {playlist.images.length === 0 ? (
                  <div className="w-full aspect-square bg-slate-600 mb-1"></div>
                ) : (
                  <div className="w-full aspect-square bg-slate-600 mb-1">
                    <img
                      alt={playlist.name}
                      src={playlist.images[0].url}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="w-[calc(90%)] text-xl font-semibold line-clamp-1">
                  {playlist.name}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Page>검색 결과가 존재하지 않습니다</Page>
      )}
    </div>
  );
}

export default PlaylistsLayout;
