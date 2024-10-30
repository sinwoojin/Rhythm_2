/* eslint-disable @next/next/no-img-element */
import { api } from '@/api/spotifyApi';
import LikeButton from '@/components/LikeButton';
import PlayButton from '@/components/PlayButton';
import dayjs from 'dayjs';
import Page from '../../_components/Page/Page';
import OptionButton from '../../_components/RootLayout/MusicPlayer/OptionButton/OptionButton';
import TrackDetailLyric from './_components/TrackDetailLyric';

interface TrackDetailPageProps {
  params: { trackId: string };
}

async function TrackDetailPage({ params: { trackId } }: TrackDetailPageProps) {
  const track = await api.track.getTrack(trackId);
  if (!track) return console.error('해당 트랙이 없습니다');

  const album = track?.album;
  const release_year = dayjs(track!.album.release_date).format('YYYY');
  const trackTitle = track?.album.name;
  const trackImg = track?.album.images[1].url;
  const artists = album?.artists[0].name;

  return (
    <Page>
      <div className="flex gap-x-6 py-4 border-b border-white mb-4 ">
        {/* 앨범 이미지 */}
        <div>
          <img src={trackImg} alt="앨범 이미지" />
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          {/* 트랙, 앨범 정보 */}
          <h1 className="font-bold text-7xl whitespace-pre-wrap line-clamp-2">
            {track?.name}
          </h1>
          <div className="flex">
            <p>{artists}</p>
            <span className="px-3">•</span>
            <span>{trackTitle}</span>
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
            <OptionButton location={'track'} trackTitle={trackTitle} trackImg={trackImg}/>
          </div>
        </div>
      </div>
      <TrackDetailLyric trackId={trackId} />
    </Page>
  );
}

export default TrackDetailPage;
