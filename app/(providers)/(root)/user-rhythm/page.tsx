import Link from "next/link";
import Page from "../_components/Page/Page";

function PlaylistsPage() {
  return (
    <Page title="User Rhythm!">
      <section className="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-10">
        {/* 각 블록을 클릭하면 해당 카테고리의 플레이리스트가 모여서 보이게 (이미지로 설정)*/}

        <div className="flex flex-wrap items-center justify-center">
          <Link href={"/playlists/k-pop"}>
            <p className="mb-1 w-full text-center">K-POP</p>
            <div className="object-cover transition-all overflow-hidden rounded-lg">
              <img
                src="https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2023/08/shutterstock_1814570624.jpg?w=1200&h=1073&crop=1"
                alt="kpop 이미지"
                className="aspect-video w-[400px]  bg-slate-700 hover:scale-125 duration-500 object-cover"
              />
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center">
          <Link href={"/playlists/j-pop"}>
            <p className="mb-1 text-center">J-POP</p>
            <div className="object-cover transition-all overflow-hidden rounded-lg">
              <img
                src="https://cnqnq6x1162u.objectstorage.ap-seoul-1.oci.customer-oci.com/p/4d_DJXYmI0ejd8avuhAILIIpyZqnmHvpQPxB3i9g9MKd65-abwpaD-tq-jraNd1k/n/cnqnq6x1162u/b/machugi-image/o/2362b569-1560-4c0a-9698-dc4840e8cd61?alt=media"
                alt="jpop 이미지"
                className="aspect-video w-[400px] bg-slate-700 hover:scale-125 duration-500 object-cover"
              />
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center">
          <Link href={"/playlists/hip-pop"}>
            <p className="mb-1 text-center">HIP-HOP</p>
            <div className="object-cover transition-all overflow-hidden rounded-lg">
              <img
                src=""
                alt=""
                className="aspect-video w-[400px] bg-slate-700 hover:scale-125 duration-500"
              />
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center">
          <Link href={"/playlists/band"}>
            <p className="mb-1 text-center">BAND</p>
            <div className="object-cover transition-all overflow-hidden rounded-lg">
              <img
                src=""
                alt=""
                className="aspect-video w-[400px] bg-slate-700 hover:scale-125 duration-500"
              />
            </div>
          </Link>
        </div>
      </section>
    </Page>
  );
}

export default PlaylistsPage;
