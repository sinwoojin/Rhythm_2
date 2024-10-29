'use client';

import { getCategory, getUserRhythms } from '@/api/supabaseGetCategories';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa';
import RhythmDetailLayout from '../../_components/Layouts/RhythmDetailLayout/RhythmDetailLayout';
import Page from '../../_components/Page/Page';
import MusicPostAddButton from './_components/MusicPostAddButton/MusicPostAddButton';

interface PlayListPageProps {
  params: {
    rhythmCategory: string;
  };
}

function PlayListPage({ params: { rhythmCategory } }: PlayListPageProps) {
  const router = useRouter();

  // 유저 리듬
  const { data: userRhythms } = useQuery({
    queryKey: ['userRhythms', { category: rhythmCategory }],
    queryFn: () => getUserRhythms(rhythmCategory),
  });

  console.log(userRhythms);

  // 카테고리 데이터
  const { data: category } = useQuery({
    queryKey: ['category', { name: rhythmCategory }],
    queryFn: () => getCategory(rhythmCategory),
  });

  if (category === null) return router.replace('/today');

  return (
    <Page>
      {category ? (
        <>
          <div className="h-[300px] absolute top-0 left-0 right-0 z-0 overflow-hidden">
            <img
              className="w-full h-full object-cover blur-lg brightness-95"
              src={category.url}
              alt={category.name}
            />
          </div>

          <div className="overflow-auto scrollbar-hide max-h-[calc(100vh_-_176px)] z-10 absolute top-0 left-0 right-0">
            <div className="absolute flex gap-x-6 h-[300px] items-end pl-10 pb-10">
              <div className="h-[200px] aspect-square rounded-full overflow-hidden bg-white/20">
                <img
                  className="w-full h-full object-cover"
                  src={category.url}
                  alt={category.name}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <h2 className="text-7xl font-bold line-clamp-1">
                  {category.name}
                </h2>
                <span className="pl-2 line-clamp-1">
                  user rhythm with {category.name}
                </span>
                <div className="flex gap-x-4 items-end">
                  <button
                    aria-label="재생"
                    className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl"
                  >
                    <FaPlay />
                  </button>
                  <MusicPostAddButton rhythmCategory={rhythmCategory} />
                </div>
              </div>
            </div>
            <RhythmDetailLayout userRhythms={userRhythms} />
          </div>
        </>
      ) : null}
    </Page>
  );
}

export default PlayListPage;
