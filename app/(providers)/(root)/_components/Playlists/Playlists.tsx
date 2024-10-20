'use client';
import { Track } from '@/schema/type';
import Link from 'next/link';
import Page from '../Page/Page';

interface ChartListProps {
  playlists: Track[];
  title: string;
}

function Playlists({ playlists, title }: ChartListProps) {
  return (
    <>
      <div className="[&+&]:mt-10">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        {playlists.length > 0 ? (
          <ul className="flex gap-x-3 overflow-auto scrollbar-hide">
            {playlists.map((playlist) => (
              <li
                key={playlist.id}
                className="flex flex-col min-w-[200px] w-[200px]"
              >
                <Link
                  href={
                    '/' /*여기에 디테일 페이지로 넘어갈 동적 url 적기 지금은 비워둠*/
                  }
                >
                  {playlist.images.length === 0 ? (
                    <div className="w-full aspect-square bg-slate-600 "></div>
                  ) : (
                    <div className="w-full aspect-square bg-slate-600 ">
                      <img
                        alt={playlist.name}
                        src={playlist.images[0].url}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-xl font-semibold line-clamp-1">
                    {playlist.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Page>검색 결과가 존재하지 않습니다</Page>
        )}
      </div>
    </>
  );
}

export default Playlists;
