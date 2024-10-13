import Link from "next/link";
import Page from "../_components/_Page/Page";

function PlaylistsPage() {
  return (
    <Page title="User Rhythm!">
      <section className="grid grid-cols-2 gap-y-5 h-[500px]">
        {/* 각 블록을 클릭하면 해당 카테고리의 플레이리스트가 모여서 보이게 (이미지로 설정)*/}

        <Link href={"/playlists/k-pop"}>
          <div className="">
            <p className="mb-2">K-POP</p>
            <img
              src=""
              alt=""
              className="w-[300px] h-[180px] bg-slate-700 rounded-lg mb-10 "
            />
          </div>
        </Link>

        <Link href={"/playlists/k-pop"}>
          <div className="">
            <p className="mb-2">J-POP</p>
            <img
              src=""
              alt=""
              className="w-[300px] h-[180px] bg-slate-700 rounded-lg mb-10 "
            />
          </div>
        </Link>

        <Link href={"/playlists/k-pop"}>
          <div className="">
            <p className="mb-2">HIP-HOP</p>
            <img
              src=""
              alt=""
              className="w-[300px] h-[180px] bg-slate-700 rounded-lg mb-10 "
            />
          </div>
        </Link>

        <Link href={"/playlists/k-pop"}>
          <div className="">
            <p className="mb-2">BAND</p>
            <img
              src=""
              alt=""
              className="w-[300px] h-[180px] bg-slate-700 rounded-lg mb-10 "
            />
          </div>
        </Link>
      </section>
    </Page>
  );
}

export default PlaylistsPage;
