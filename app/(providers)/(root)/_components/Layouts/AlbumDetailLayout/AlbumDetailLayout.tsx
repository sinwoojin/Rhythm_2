import PlayButton from '@/components/PlayButton';
import { Track } from '@/schema/type';
import Link from 'next/link';
import OptionButton from '../../RootLayout/MusicPlayer/OptionButton/OptionButton';

interface AlbumDetailLayoutProps {
  albumTracks?: Track[];
  albumUri: string;
}
function AlbumDetailLayout({ albumTracks, albumUri }: AlbumDetailLayoutProps) {
  const order = (index: number) => index + 1;

  return albumTracks ? (
    <ul className="flex flex-col">
      {albumTracks?.map((track, index) => (
        <li
          key={track.id}
          className="flex h-20 px-4 py-[10px] w-full gap-4 items-center rounded-sm transition-all hover:bg-white/10 group"
        >
          <span className="flex flex-row-reverse min-w-[24px] items-center relative">
            <span className="w-full text-center group-hover:hidden">
              {order(index)}
            </span>
            <PlayButton
              source={{ context: albumUri, index: index }}
              trackInfo={{ tracks: albumTracks, index: index }}
              type="smallWhite"
            />
          </span>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex gap-4 items-center">
              <div className="w-full">
                <Link href={`/tracks/${track.id}`}>{track.name}</Link>
                <div className="w-full text-white/50 flex">
                  {track.artists.map((artist, index) => (
                    <li key={artist.id}>
                      <Link href={`/artists/${artist.id}`}>
                        {index !== 0 && ',  '}
                        {artist.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <OptionButton location="tracks" />
        </li>
      ))}
    </ul>
  ) : null;
}

export default AlbumDetailLayout;
