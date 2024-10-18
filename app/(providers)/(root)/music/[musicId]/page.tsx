import { api } from "@/api/spotifyApi";
import dayjs from "dayjs";
import { FaPlay } from "react-icons/fa";
import Page from "../../_components/Page/Page";

interface MusicDetailPageProps {
  params: { musicId: string };
}

async function MusicDetailPage({ params: { musicId } }: MusicDetailPageProps) {
  const track = await api.track.getTracks(musicId);
  const lyricUrl = await api.genius.getSpotifyLyricsUrl(musicId);
  const lyric = await api.genius.scrapeLyricsFromGenius(lyricUrl);

  const album = track?.album;
  const release_date = dayjs(track!.album.release_date);
  const release_year = release_date.format("YYYY");

  const albumTitle = track?.album.name;
  const albumImg = track?.album.images[1].url;
  const artists = album?.artists[0].name;

  return (
    <Page>
      <div className="flex gap-x-6 py-4 border-b border-white mb-4 ">
        <div>
          <img src={albumImg} alt="앨범 이미지" />
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          <h2 className="font-bold text-7xl whitespace-pre-wrap line">
            {track?.name}
          </h2>
          <div className="flex">
            <p>{artists}</p>
            <span className="px-3">•</span>
            <span>{albumTitle}</span>
            <span className="px-3">•</span>
            <span>{release_year}</span>
          </div>
          <div>
            <button className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl">
              <FaPlay type="button" />
            </button>
          </div>
        </div>
      </div>
      <div className="pb-9 ">
        <h2 className="mb-5 text-3xl font-bold">가사</h2>
        <p className="whitespace-pre-wrap break-words break-all  text-base">
          {lyric}
        </p>
      </div>
    </Page>
  );
}

export default MusicDetailPage;
