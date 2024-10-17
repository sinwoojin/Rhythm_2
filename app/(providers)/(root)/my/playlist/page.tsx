import Page from "../../_components/Page/Page";
import CreatePlaylistToggle from "./_component/_CreatePlaylistToggle/CreatePlaylistToggle";

function Playlist() {
  // 여기서 내가 만든 플리 전부 불러오기
  // const myPlaylists = await getPlaylists()
  return (
    <Page title="내 플레이리스트" isNav={true}>
      <div className="flex w-full gap-x-6 mb-10">
        <CreatePlaylistToggle />
      </div>
      <div>
        <ul>
          {/* {myPlaylists.map((myPlaylist) => (
          <li key={myPlaylist.id}>
            <Link
              href="/플리 디테일 페이지로 이동"
              className="flex gap-x-5 h-40 p-4 items-center"
            >
              <div className="bg-white/20 h-full aspect-square">
              <img src={플리에 있는 첫번째 노래 썸네일 주소} alt="userPlayList" /></div>
              <div className="grid grid-cols-4 w-full">
                <span className="col-span-2 text-lg">
                  {사용자 이름}님의 플레이리스트
                </span>
                <span className="col-span-1 text-lg text-white/60">{플레이리스트 노래수}</span>
                <span className="col-span-1 text-lg ml-auto">
                  <button>
                    <SlOptions />
                  </button>
                </span>
              </div>
            </Link>
          </li>
          ))} */}
        </ul>
      </div>
    </Page>
  );
}

export default Playlist;
