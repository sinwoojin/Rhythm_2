'use client';
import { Track } from '@/schema/type';
import Link from 'next/link';
import Page from '../../Page/Page';
import PrevNextButton from '../PrevNextButton/PrevNextButton';

interface ChartListProps {
  tracks: Track[];
  title: string;
}

function MusicsLayout({ tracks, title }: ChartListProps) {
  return (
    <>
      <div className="[&+&]:mt-20 relative max-w-full">
        <PrevNextButton />
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        {tracks && tracks.length > 0 ? (
          <ul className="flex gap-x-4 overflow-auto scrollbar-hide max-w-full">
            {tracks.map((track) => (
              <li
                key={track.id}
                className="flex flex-col w-[200px] min-w-[200px]"
              >
                <Link href={`/music/${track.id}`}>
                  <div className="w-full aspect-square">
                    <img
                      className="object-cover"
                      src={track.album.images[0]?.url || '/default-image.jpg'}
                      alt="이미지"
                    />
                  </div>
                  <p className="text-xl font-semibold line-clamp-1">
                    {track.name}
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

export default MusicsLayout;
