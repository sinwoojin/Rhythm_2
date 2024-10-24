/* eslint-disable @next/next/no-img-element */
import { Track } from '@/schema/type';
import Link from 'next/link';
import { SlOptions } from 'react-icons/sl';

interface PlaylistDetailLayoutProps {
  playlistTracks?: { track: Track }[];
}
function PlaylistDetailLayout({ playlistTracks }: PlaylistDetailLayoutProps) {
  const tracks = playlistTracks?.map((item) => item.track);
  //순서를 나타내기 위한 함수
  const order = (index: number) => index + 1;
  return playlistTracks ? (
    <ul className="flex flex-col">
      {tracks?.map((track, index) => (
        <li
          key={track.id}
          className="flex h-20 px-4 py-[10px] w-full gap-4 items-center rounded-sm transition-all hover:bg-white/10"
        >
          <span className="flex flex-row-reverse max-w-4 items-center">
            {order(index)}
          </span>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex gap-4 items-center">
              <img src={track.album.images[2].url} alt="image" />
              <div className="w-full">
                <Link href={`/music/${track.id}`}>{track.name}</Link>
                <div className="w-full text-white/50 flex">
                  {track.artists.map((artist, index) => (
                    <li key={artist.id}>
                      <Link href={`/artist/${artist.id}`}>
                        {index !== 0 && ',  '}
                        {artist.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center">
              <Link href={`/album/${track.album.id}`}>{track.album.name}</Link>
            </div>
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
