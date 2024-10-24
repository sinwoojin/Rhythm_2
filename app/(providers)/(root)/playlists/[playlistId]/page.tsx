/* eslint-disable @next/next/no-img-element */
'use client';
import { api } from '@/api/spotifyApi';
import { Playlist } from '@/schema/type';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import PlaylistDetailLayout from '../../_components/Layouts/PlaylistDetailLayout/PlaylistDetailLayout';
import Page from '../../_components/Page/Page';

function PlayListDetail() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const response = await api.playlist.getPlaylists(String(playlistId));
      setPlaylist(response);
    })();
  }, [playlistId]);

  const track = playlist?.tracks.items;

  return (
    <Page>
      <article className="py-4 border-b mb-4 border-white">
        <div className="flex gap-x-6 mb-6 h-[200px]">
          <div className="aspect-square bg-white/20 h-full">
            <img src={playlist?.images[0].url} alt="image" />
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-7xl font-bold line-clamp-1">
              {playlist?.name}
            </h2>
            <div className="line-clamp-1">{playlist?.description}</div>
            <div className="flex gap-x-4">
              <button className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl">
                <FaPlay />
              </button>
              <button className="text-5xl">
                <IoIosAddCircleOutline />
              </button>
            </div>
          </div>
        </div>
      </article>
      <article>
        <PlaylistDetailLayout playlistTracks={track} />
      </article>
    </Page>
  );
}

export default PlayListDetail;
