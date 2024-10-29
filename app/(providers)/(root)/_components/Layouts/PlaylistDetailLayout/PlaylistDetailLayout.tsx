/* eslint-disable @next/next/no-img-element */
import { Track } from '@/schema/type';
import useSpotifyStore from '@/zustand/spotifyStore';
import Link from 'next/link';
import { SlOptions } from 'react-icons/sl';
import PlayButton from '../_components/PlayButton/PlayButton';

interface PlaylistDetailLayoutProps {
  playlistTracks?: { track: Track }[];
  playlistUri: string;
}

function PlaylistDetailLayout({
  playlistTracks,
  playlistUri,
}: PlaylistDetailLayoutProps) {
  const deleteTrack = useSpotifyStore((state) => state.deleteTrackToPlaylists);

  const handleClickDeleteTrack = () => {
    deleteTrack(
      '1sn2lED7HkCuT82HKTBA62',
      'spotify:track:2fRFwWwZG7Qfkui7GcxTMy',
      'AAAACSuO4N2saEIYgaZxv2d4I28hQO1j ',
    );
  };

  return playlistTracks ? (
    <ul className="flex flex-col">
      {playlistTracks.map(({ track }, index) => (
        <li
          key={track?.id}
          className="flex h-20 px-4 py-[10px] w-full gap-4 items-center rounded-sm transition-all hover:bg-white/10 group"
        >
          <span className="flex flex-row-reverse min-w-[24px] items-center relative">
            <span className="group-hover:hidden">{index + 1}</span>
            <PlayButton
              track={track}
              index={index}
              playlistUri={playlistUri}
              playlistTracks={playlistTracks}
            />
          </span>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex gap-4 items-center">
              <img src={track?.album?.images[2].url} alt="image" />
              <div className="w-full">
                <Link href={`/track/${track?.id}`}>{track?.name}</Link>
                <div className="w-full text-white/50 flex">
                  {track?.artists.map((artist, index) => (
                    <span key={artist.id}>
                      {index > 0 && ', '}
                      <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center">
              <Link href={`/album/${track?.album.id}`}>
                {track?.album.name}
              </Link>
            </div>
          </div>
          <button onClick={handleClickDeleteTrack}>삭제하기</button>
          <button aria-label="옵션 버튼" className="text-xl text-white/50">
            <SlOptions />
          </button>
        </li>
      ))}
    </ul>
  ) : null;
}

export default PlaylistDetailLayout;
