import { supabase } from '@/supabase/client';
import dayjs from 'dayjs';
import Link from 'next/link';
import Page from '../../../_components/Page/Page';

interface UserRhythmDetailPageProps {
  params: { userRhythmId: string };
}

async function UserRhythmDetailPage({
  params: { userRhythmId },
}: UserRhythmDetailPageProps) {
  const response = await supabase
    .from('userRhythm')
    .select('*')
    .eq('id', userRhythmId);
  const result = response.data;

  return (
    <Page>
      <div className="max-w-screen-[1200px] mx-auto p-4">
        <ul className="space-y-16">
          {result?.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-y-6 bg-gray-900 p-8 rounded-lg shadow-lg"
            >
              <div className="flex gap-x-10">
                <div className="w-2/3">
                  <Link href={`/tracks/${item.trackId}`}>
                    <img
                      src={item.trackImgURL}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
                    />
                  </Link>
                </div>
                <div className="w-2/3">
                  <h2 className="text-5xl font-bold text-white mb-6">
                    {item.title}
                  </h2>
                  <h6 className="text-lg text-gray-400 mb-3">
                    작성자: {item.userName}
                  </h6>
                  <h6 className="text-lg text-gray-400 mb-4">
                    카테고리:{'' + item.category}
                  </h6>
                  <p className="text-xl text-white mb-6">{item.content}</p>{' '}
                </div>
              </div>
              <div className="text-gray-500 mt-2">
                {dayjs(item.createdAt).format('YYYY-MM-DD')}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

export default UserRhythmDetailPage;
