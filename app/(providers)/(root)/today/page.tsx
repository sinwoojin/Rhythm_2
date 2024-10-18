import { api } from "@/api/spotifyApi";
import Musics from "../_components/Musics/Music";
import Page from "../_components/Page/Page";

const TOP_100_MUSIC_ID="5ABHKGoOzxkaa28ttQV9sE";

async function TodayPage() {
  /*spotify Top 100 음악 가져오는 api */
  const response = await api.playlist.getPlaylists(TOP_100_MUSIC_ID);
  const tracks = response?.tracks.items.map((item) => item.track);

  return (
    <Page title="투데이">
      <div id="popular-music">
        <Musics title="Music-100" tracks={tracks!} />
      </div>
      <div id="popular-rhythm">
        <Musics title="Rhythm-100" tracks={tracks!} />
      </div>
      <div id="popular-user">
        <Musics title="User-100" tracks={tracks!} />
      </div>
    </Page>
  );
}

export default TodayPage;
