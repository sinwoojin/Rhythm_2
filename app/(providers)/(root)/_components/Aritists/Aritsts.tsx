'use client';
import { Track } from '@/schema/type';
import Link from 'next/link';
import Page from '../Page/Page';

interface ChartListProps {
  artists: Track[];
  title: string;
}

function Artists({ artists, title }: ChartListProps) {
  return (
    <>
      <div className="[&+&]:mt-10">
        <h3 className="text-2xl font-bold">{title}</h3>
        {artists.length > 0 ? (
          <ul className="w-full flex gap-x-3 overflow-auto scrollbar-hide">
            {artists.map((artist) => (
              <li key={artist.id} className="flex flex-col min-w-[17%]">
                <Link
                  className="w-full aspect-square"
                  href={
                    '/' /*여기에 디테일 페이지로 넘어갈 동적 url 적기 지금은 비워둠*/
                  }
                >
                  {artist.images.length === 0 ? (
                    <div className="rounded-full w-full aspect-square"></div>
                  ) : (
                    <img
                      src={artist.images[1].url}
                      className="w-full h-full object-cover"
                    />
                  )}

                  <p className="text-xl font-semibold">{artist.name}</p>
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

export default Artists;
