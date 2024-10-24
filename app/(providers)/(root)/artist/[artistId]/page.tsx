import { api } from '@/api/spotifyApi';
import { artistAlbum, artistTopMusic, SpotifyArtist } from '@/schema/type';
import { SlOptions } from 'react-icons/sl';
import Page from '../../_components/Page/Page';

interface ArtistDetailPageProps {
  params: { artistId: string };
}

async function ArtistDetailPage(props: ArtistDetailPageProps) {
  // 현재 페이지의 아티스트 id
  const artistId = props.params.artistId;

  // 가수 정보 가져오기
  const artist = (await api.artist.getArtist(artistId)) as SpotifyArtist;

  // 가수 인기곡 가져오기
  const topArtistMusic = (await api.artist.getTopArtistMusic(
    artistId,
  )) as artistTopMusic;

  // 아티스트 앨범 가져오기
  const artistAlbum = (await api.artist.getArtistAlbum(
    artistId,
  )) as artistAlbum;

  console.log(artistAlbum);
  return (
    <Page>
      <article className="py-4 mb-4 h-full">
        {/* 아티스트 정보 */}
        <div className="w-full bg-slate-400 h-[270px] relative mb-10 overflow-hidden">
          <img
            src={artist.images[0].url}
            alt="가수 얼굴"
            className="aspect-square h-[270px] w-full brightness-50 object-cover object-top blur-lg"
          />
          <h2 className="absolute bottom-10 left-10 font-bold text-2xl">
            {artist.name}
          </h2>
        </div>

        {/* 아티스트 인기곡 */}
        <div>
          <h3 className="mb-5 text-2xl font-semibold">노래</h3>
          <ul className="w-full flex flex-col overflow-auto scrollbar-hide">
            {topArtistMusic.tracks.slice(0, 5).map((track, idx) => (
              <li
                className="flex h-20 px-4 py-[10px] w-full gap-4 items-center rounded-sm transition-all hover:bg-white/10"
                key={track.id}
              >
                <div className="">{idx + 1}</div>
                <div className="h-full aspect-square rounded-sm bg-white/20">
                  <img src={track.album.images[0].url} alt="" />
                </div>
                <div className="w-full">{track.name}</div>
                <div className="w-full text-white/50">
                  {track.artists[0].name}
                </div>
                <button
                  aria-label="옵션 버튼"
                  className="text-xl text-white/50"
                >
                  <SlOptions />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 아티스트 앨범 */}
        <div className="mt-10">
          <h3 className="mb-5 text-2xl font-semibold">앨범</h3>
          <ul className="w-full flex overflow-auto scrollbar-hide">
            {artistAlbum.items.map((album) => (
              <li
                className="flex flex-col px-4 py-[10px] gap-7 w-[150px] h-[150px]"
                key={album.artists.id}
              >
                <img
                  className="rounded-sm bg-white/20  aspect-[1/2] "
                  alt="앨범 이미지"
                  src={album.images[0].url}
                />

                <span className="w-full text-white/50">{album.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Page>
  );
}

export default ArtistDetailPage;
