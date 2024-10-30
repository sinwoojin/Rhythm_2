/* eslint-disable @next/next/no-img-element */
'use client';
import { api } from '@/api/spotifyApi';
import PlayButton from '@/components/PlayButton';
import { Album } from '@/schema/type';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const currentTrack = useSpotifyStore((state) => state.currentTrack);

  const tracks = album?.tracks.items || [];
  const albumUri = String(album?.uri);
  let trackIndex = tracks.findIndex((track) => track.id === currentTrack?.id);
  trackIndex = trackIndex === -1 ? 0 : trackIndex;

  return (
    <Page>
      <article className="py-4 border-b mb-4 border-white">
        <div className="flex gap-x-6 mb-6 h-[200px]">
          <div className="aspect-square bg-white/20 h-full">
            <img src={album?.images[0].url} alt="image" />
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-7xl font-bold leading-snug line-clamp-1">
              {album?.name}
            </h2>
            <span className="line-clamp-1">{album?.description}</span>
            <div className="flex gap-x-4">
              <PlayButton
                source={{ context: albumUri, index: trackIndex }}
                trackInfo={{
                  tracks: tracks || [],
                  index: trackIndex,
                }}
                type="bigRed"
              />
              <button aria-label="플레이리스트 추가" className="text-5xl">
                <IoIosAddCircleOutline />
              </button>
            </div>
          </div>
        </div>
      </article>
      <article>
        <AlbumDetailLayout albumTracks={tracks} albumUri={albumUri} />
      </article>
    </Page>
  );
}

export default AlbumDetail;
