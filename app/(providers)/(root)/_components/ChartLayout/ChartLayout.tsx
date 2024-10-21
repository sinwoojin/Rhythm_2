import { Track } from '@/schema/type';
import Link from 'next/link';

interface ChartProps {
  tracks: Track[];
  title: string;
}

function ChartLayout({ title, tracks }: ChartProps) {
  console.log(title);
  return (
    <div className="[&+&]:mt-16 py-6 px-6">
      <h2 className="font-bold text-2xl mb-6">{title}</h2>
      {/* 그리드 활용해 3 * 3으로 보여주기  */}
      <ul className="grid grid-rows-3 gap-x-5 grid-flow-col gap-y-4 overflow-auto scrollbar-hide">
        {tracks.map((track) => (
          <Link href={`/music/${track.id}`}>
            <li key={track.id} className="w-72 h-[50px] mr-5 flex gap-x-5">
              {/* 이게 하나 */}
              <div className="h-full aspect-square bg-white">
                <img src={track.album.images[0]?.url} alt="" />
              </div>
              <div className="h-full">
                <p className="font-bold">{/* 순위 넣어주셈 idx */}</p>
              </div>
              <div className="w-full flex flex-col gap-y-[2px]">
                <p className="font-bold line-clamp-1">{track.name}</p>
                <p className="text-sm text-white/50  line-clamp-1">
                  {track.artists[0]?.name}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ChartLayout;
