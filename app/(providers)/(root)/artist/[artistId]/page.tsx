'use client';
import { api } from '@/api/spotifyApi';
import { Artist } from '@/schema/type';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ArtistDetailLayout from '../../_components/Layouts/ArtistDetailLayout.tsx/ArtistDetailLayout';
import Page from '../../_components/Page/Page';

function ArtistDetailPage() {
  const { artistId } = useParams();

  const [artist, setArtist] = useState<Artist | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const response = await api.artist.getArtist(String(artistId));
      setArtist(response);
    })();
  }, [artistId]);
  return (
    <Page>
      <article className="py-4 border-b mb-4 border-white">
        <div className="flex gap-x-6 mb-6 h-[300px] relative">
          <div className="absolute top-0 left-0 right-0 h-full w-full overflow-hidden">
            <img
              src={artist?.images[0].url}
              alt="가수 얼굴"
              className="w-full h-full object-cover brightness-50 object-top blur-lg"
            />
          </div>
          <div className="absolute z-10 top-0 left-0 right-0 h-full flex gap-x-4 p-10">
            <div className="h-full aspect-square bg-white/20 rounded-full overflow-hidden">
              <img
                src={artist?.images[0].url}
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <h2 className="text-7xl font-bold line-clamp-1">
                {artist?.name}
              </h2>
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
        </div>
      </article>
      <article>
        <ArtistDetailLayout artistId={artistId} />
      </article>
    </Page>
  );
}

export default ArtistDetailPage;
