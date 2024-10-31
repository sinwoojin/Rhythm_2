/* eslint-disable @next/next/no-img-element */
import { api } from '@/api/spotifyApi';
import LikeButton from '@/components/LikeButton';
import PlayButton from '@/components/PlayButton';
import UnderLine from '@/components/UnderLine';
import dayjs from 'dayjs';
import Link from 'next/link';
import Page from '../../_components/Page/Page';
import OptionButton from '../../_components/RootLayout/MusicPlayer/OptionButton/OptionButton';
import TrackDetailLyric from './_components/TrackDetailLyric';

interface TrackDetailPageProps {
  params: { trackId: string };
}

async function TrackDetailPage({ params: { trackId } }: TrackDetailPageProps) {
  const track = await api.track.getTrack(trackId);
  if (!track) return console.error('해당 트랙이 없습니다');

  const trackTitle = track.name;
  const album = track?.album;
  const release_year = dayjs(track!.album.release_date).format('YYYY');
  const albumTitle = track?.album.name;
  const albumImg = track?.album.images[1].url;
  const artistsId = album.artists.map((item) => item.id);
  const artists = album?.artists.map((item) => item.name);

  return (
    <Page>
      <div className="flex gap-x-6 py-4 border-b border-white mb-4 ">
        {/* 앨범 이미지 */}
        <div>
          <img src={albumImg} alt="앨범 이미지" />
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          {/* 트랙, 앨범 정보 */}
          <h2 className="font-bold text-7xl whitespace-pre-wrap leading-snug line-clamp-1">
            {track?.name}
          </h2>
          <div className="flex">
            <Link href={`/artists/${artistsId}`}>
              <UnderLine>{artists}</UnderLine>
            </Link>

            <span className="px-3">•</span>

            <Link href={`/albums/${album.id}`}>
              <UnderLine>{albumTitle}</UnderLine>
            </Link>

            <span className="px-3">•</span>
            <span>{release_year}</span>
          </div>

          {/* 각종 버튼 */}
          <div className="flex gap-x-4 items-center">
            <PlayButton
              source={{ context: [track.uri], index: 0 }}
              trackInfo={{
                tracks: [track],
                index: 0,
              }}
              type="bigRed"
            />
            <LikeButton trackId={track.id} hasBorder={true} />
            <OptionButton
              location={'track'}
              trackTitle={trackTitle}
              trackImg={albumImg}
              trackId={track.id}
              trackUri={track.uri}
              artistName={artists}
              track={track}
              artistsId={artistsId}
              albumId={album.id}
            />
          </div>
        </div>
      </div>
      <TrackDetailLyric trackId={trackId} />
    </Page>
  );
}

export default TrackDetailPage;
