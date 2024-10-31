import { api } from '@/api/spotifyApi';
import ChartLayout from '../_components/Layouts/ChartLayout/ChartLayout';
import Page from '../_components/Page/Page';

const TOP_100_KPOP = '4cRo44TavIHN54w46OqRVc';
const TOP_100_JPOP = '7kZ9P3CU9DRN4F7t1YPcn4';
const TOP_100_BILLBOARD = '6UeSakyzhiEt4NB3UAd6NQ';

async function ChartPage() {
  const kpop = await api.playlist.getPlaylist(TOP_100_KPOP);
  const top100Korea = kpop?.tracks.items.map((item) => item.track);

  const jpop = await api.playlist.getPlaylist(TOP_100_JPOP);
  const top100JAPAN = jpop?.tracks.items.map((item) => item.track);

  const pop = await api.playlist.getPlaylist(TOP_100_BILLBOARD);
  const top100Billboard = pop?.tracks.items.map((item) => item.track);

  return (
    <Page title="차트">
      <ChartLayout title="빌보드 차트" tracks={top100Billboard!} />
      <ChartLayout title="한국 인기차트" tracks={top100Korea!} />
      <ChartLayout title="일본 인기차트" tracks={top100JAPAN!} />
    </Page>
  );
}

export default ChartPage;
