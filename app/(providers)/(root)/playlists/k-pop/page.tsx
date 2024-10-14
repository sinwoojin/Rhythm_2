import Link from "next/link";
import Page from "../../_components/_Page/Page";

function KpopPage() {
  return (
    <Page title="K-POP Rhythm!">
      <div className="w-full p-6 bg-slate-700 rounded-lg mb-10">
        <div className="flex gap-x-6">
          <Link href={"/"}>
            {/* 플레이리스트 이미지/이미지 클릭하면 해당 플레이리스트 상세페이지로 이동 */}
            <div className="w-[130px] h-[130px] bg-white">
              {/* <img src="" alt="" /> */}
            </div>
          </Link>
          <div className="flex flex-col gap-y-2">
            <Link href="/">
              {/* 사용자 프로필 누르면 그사람 프로필 디테일 페이지로 이동 */}
              <div className="bg-gray-600 w-14 h-14 rounded-full">
                {/* <img src="" alt="" /> */}
              </div>
            </Link>
            <span className="">플레이리스트 제목!</span>
            <span className="">
              플레이리스트 소개글 Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Commodi sequi error officiis fuga quod delectus
              cum repellendus molestias soluta quia!
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[150px] bg-slate-700 rounded-lg  mb-10">
        <Link href={"/"}></Link>
      </div>

      <div className="w-full h-[150px] bg-slate-700 rounded-lg  mb-10">
        <Link href={"/"}></Link>
      </div>

      <div className="w-full h-[150px] bg-slate-700 rounded-lg  mb-10">
        <Link href={"/"}></Link>
      </div>
    </Page>
  );
}

export default KpopPage;
