import { getCategory } from '@/api/supabaseGetCategories';
import Page from '../../_components/Page/Page';
import { redirect } from 'next/navigation';
import { FaPlay } from 'react-icons/fa';
import PlaylistDetailLayout from '../../_components/Layouts/PlaylistDetailLayout/PlaylistDetailLayout';
import MusicPostAddButton from './_components/MusicPostAddButton/MusicPostAddButton';

interface PlayListPageProps {
  params: {
    rhythmCategory: string;
  };
}

async function PlayListPage({ params: { rhythmCategory } }: PlayListPageProps) {
  const category = await getCategory(rhythmCategory);

  if (!category) return redirect('/today');

  return (
    <Page>
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
            <h2 className="text-7xl font-bold line-clamp-1">{category.name}</h2>
            <span className="pl-2 line-clamp-1">
              user rhythm with {category.name}
            </span>
            <div className="flex gap-x-4 items-end">
              <button className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl">
                <FaPlay />
              </button>
              <MusicPostAddButton />
            </div>
          </div>
        </div>
        <div className="mt-[310px] bg-[#121212]">
          <PlaylistDetailLayout />
        </div>
      </div>
    </Page>
  );
}

export default PlayListPage;
