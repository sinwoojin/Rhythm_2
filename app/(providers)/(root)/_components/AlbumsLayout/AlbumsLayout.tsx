'use client';
import { Track } from '@/schema/type';
import Link from 'next/link';
import Page from '../Page/Page';

interface ChartListProps {
  albums: Track[];
  title: string;
}

function AlbumsLayout({ albums, title }: ChartListProps) {
  return (
    <>
      <div className="[&+&]:mb-10">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        {albums.length > 0 ? (
          <ul className="flex gap-x-4 overflow-auto scrollbar-hide">
            {albums.map((album) => (
              <li
                key={album.id}
                className="flex flex-col w-[200px] min-w-[200px]"
              >
                <Link
                  href={
                    '/' /*여기에 디테일 페이지로 넘어갈 동적 url 적기 지금은 비워둠*/
                  }
                >
                  {album.images.length === 0 ? (
                    <div className="w-full aspect-square bg-slate-600"></div>
                  ) : (
                    <img className="object-cover" src={album.images[0].url} />
                  )}
                  <p className="text-xl font-semibold line-clamp-1">
                    {album.name}
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

export default AlbumsLayout;
