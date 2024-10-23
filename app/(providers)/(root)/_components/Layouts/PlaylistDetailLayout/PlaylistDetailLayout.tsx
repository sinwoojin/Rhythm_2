import { Playlist } from '@/schema/type';
import { SlOptions } from 'react-icons/sl';

interface PlaylistMusicsProps {
  playlistMusics?: Playlist[] | null; // 하나짜리 플리
}

function PlaylistDetailLayout({ playlistMusics }: PlaylistMusicsProps) {
  return playlistMusics ? (
    <ul className="flex flex-col">
      {playlistMusics.map((playlistMusic) => (
        <li
          key={playlistMusic?.id}
          className="flex h-20 px-4 py-[10px] w-full gap-4 items-center rounded-sm transition-all hover:bg-white/10"
        >
          <div className="">1{/* 노래 순서 idx + 1 */}</div>
          <div className="h-full aspect-square rounded-sm bg-white/20">
            {/* 노래 썸네일 이미지 넣어주셈 */}
          </div>
          <div className="w-full">가리워진 길{/* 노래 제목 */}</div>
          <div className="w-full text-white/50">
            볼빨간 사춘기{/* 가수 이름 */}
          </div>
          <button aria-label="옵션 버튼" className="text-xl text-white/50">
            <SlOptions />
          </button>
        </li>
      ))}
    </ul>
  ) : null;
}

export default PlaylistDetailLayout;
