import Link from "next/link";
import Page from "../../_components/_Page/Page";

function KpopPage() {
  return (
    <Page title="K-POP Rhythm!">
      {/* 링크 클릭하면 해당 플레이리스트로 이동 */}
      <div className="w-[800px] h-[150px] bg-slate-700 rounded-lg  mb-10">
        {/* 플레이리스트 이미지 */}
        <Link href={"/"}>
          <img
            src=""
            alt=""
            className="w-[130px] h-[130px] bg-white mx-5 mt-2.5 inline-block"
          />

          <span className="mr-5">플레이리스트 제목!</span>
          <span>플레이리스트 소개글</span>
        </Link>
      </div>

      <div className="w-[800px] h-[150px] bg-slate-700 rounded-lg  mb-10">
        <Link href={"/"}></Link>
      </div>

      <div className="w-[800px] h-[150px] bg-slate-700 rounded-lg  mb-10">
        <Link href={"/"}></Link>
      </div>

      <div className="w-[800px] h-[150px] bg-slate-700 rounded-lg  mb-10">
        <Link href={"/"}></Link>
      </div>
    </Page>
  );
}

export default KpopPage;
