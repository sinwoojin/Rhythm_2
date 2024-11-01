import MyPlaylists from '../../_components/MyPlaylists/MyPlaylists';
import Page from '../../_components/Page/Page';
import CreatePlaylistToggle from './_component/_CreatePlaylistToggle/CreatePlaylistToggle';

function MyPlaylist() {
  return (
    <Page title="내 플레이리스트" isNav={true}>
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-2xl font-bold text-white w-[300px]">
          내 플레이리스트
        </h1>
        <CreatePlaylistToggle />
      </div>
      <MyPlaylists location="my" userId="" />
    </Page>
  );
}

export default MyPlaylist;
