import { api } from '@/api/spotifyApi';
import Page from '../_components/Page/Page';
import ChartLayout from '../_components/Layouts/ChartLayout/ChartLayout';

const TOP_100_KOREA = '6kbzPEHj3uMPRFsR3v6xzE';
const TOP_100_JAPAN = '7kZ9P3CU9DRN4F7t1YPcn4';
const TOP_100_BILLBOARD = '6UeSakyzhiEt4NB3UAd6NQ';

async function ChartPage() {
  const response = await api.playlist.getPlaylists(TOP_100_KOREA);
  const top100Korea = response?.tracks.items.map((item) => item.track);

  const response1 = await api.playlist.getPlaylists(TOP_100_JAPAN);
  const top100JAPAN = response1?.tracks.items.map((item) => item.track);

  const response2 = await api.playlist.getPlaylists(TOP_100_BILLBOARD);
  const top100Billboard = response2?.tracks.items.map((item) => item.track);

  return (
    <Page title="차트">
      <ChartLayout title="한국 인기차트" tracks={top100Korea!} />
      <ChartLayout title="일본 인기차트" tracks={top100JAPAN!} />
      <ChartLayout title="빌보드 차트" tracks={top100Billboard!} />
    </Page>
  );
}

export default ChartPage;
