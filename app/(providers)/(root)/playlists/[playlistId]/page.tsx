/* eslint-disable @next/next/no-img-element */
'use client';
import { api } from '@/api/spotifyApi';
import PlayButton from '@/components/PlayButton';
import { Playlist } from '@/schema/type';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { IoIosAddCircleOutline } from 'react-icons/io';
import PlaylistDetailLayout from '../../_components/Layouts/PlaylistDetailLayout/PlaylistDetailLayout';
import Page from '../../_components/Page/Page';

function PlayListDetailPage() {
  const { playlistId } = useParams();
  const { data: playlist }: UseQueryResult<Playlist> = useQuery({
    queryKey: ['playlists', { id: playlistId }],
    queryFn: async (): Promise<Playlist | undefined> => {
      const response = await api.playlist.getPlaylist(String(playlistId));
      if (!response) return;
      return response;
    },
  });
  const currentTrack = useSpotifyStore((state) => state.currentTrack);

  if (!playlist) return;

  const tracks = playlist?.tracks.items.map((item) => item.track);
  const playlistUri = String(playlist?.uri);
  let trackIndex = tracks.findIndex((track) => track.id === currentTrack?.id);
  trackIndex = trackIndex === -1 ? 0 : trackIndex;

  return (
    <Page>
      <article className="py-4 border-b mb-4 border-white">
        <div className="flex gap-x-6 mb-6">
          <div className="aspect-square bg-white/20 h-[200px]">
            {playlist?.images !== null ? (
              <img
                className="w-full h-full object-cover"
                src={playlist?.images[0].url}
                alt="image"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-7xl font-bold leading-snug line-clamp-1">
              {playlist?.name}
            </h2>
            <div className="line-clamp-1">{playlist?.description}</div>
            <div className="flex gap-x-4">
              <PlayButton
                source={{ context: playlist.uri, index: trackIndex }}
                trackInfo={{
                  tracks,
                  index: trackIndex,
                }}
                type="bigRed"
              />
              <button aria-label="추가" className="text-5xl">
                <IoIosAddCircleOutline />
              </button>
            </div>
          </div>
        </div>
      </article>
      <article>
        <PlaylistDetailLayout
          playlistTracks={tracks}
          playlistUri={playlistUri}
          playlistId={playlist?.id}
          snapshotId={playlist.snapshot_id}
          ownerId={playlist.owner.id}
        />
      </article>
    </Page>
  );
}

export default PlayListDetailPage;
