import { api } from "@/api/spotifyApi";
import Page from "../_components/_Page/Page";

async function TodayPage() {
  /*spotify Top 100 음악 가져오는 api */
  const response = await api.PlaylistAPI.getPlaylists("5ABHKGoOzxkaa28ttQV9sE");
  const topMusic = response?.tracks.items;

  return (
    <Page title="투데이">
      {/*작동 안돼서 일단 주석 처리함 */}
      {/* <div id="popular-music">
        <Musics title="Music-100" bestMusics={response} />
      </div>
      <div id="popular-rhythm">
        <Musics title="Rhythm-100" bestMusics={response} />
      </div>
      <div id="popular-user">
        <Musics title="User-100" bestMusics={response} />
      </div> */}
    </Page>
  );
}

export default TodayPage;
