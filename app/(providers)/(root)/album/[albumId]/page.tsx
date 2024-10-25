/* eslint-disable @next/next/no-img-element */
'use client';
import { api } from '@/api/spotifyApi';
import { Album } from '@/schema/type';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import AlbumDetailLayout from '../../_components/Layouts/AlbumDetailLayout/AlbumDetailLayout';
import Page from '../../_components/Page/Page';

function AlbumDetail() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const response = await api.album.getAlbum(String(albumId));
      setAlbum(response);
    })();
  }, [albumId]);

  const track = album?.tracks.items;

  return (
    <Page>
      <article className="py-4 border-b mb-4 border-white">
        <div className="flex gap-x-6 mb-6 h-[200px]">
          <div className="aspect-square bg-white/20 h-full">
            <img src={album?.images[0].url} alt="image" />
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-7xl font-bold line-clamp-1">{album?.name}</h2>
            <span className="line-clamp-1">{album?.description}</span>
            <div className="flex gap-x-4">
              <button
                aria-label="재생"
                className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl"
              >
                <FaPlay />
              </button>
              <button aria-label="플레이리스트 추가" className="text-5xl">
                <IoIosAddCircleOutline />
              </button>
            </div>
          </div>
        </div>
      </article>
      <article>
        <AlbumDetailLayout albumTracks={track} />
      </article>
    </Page>
  );
}

export default AlbumDetail;
