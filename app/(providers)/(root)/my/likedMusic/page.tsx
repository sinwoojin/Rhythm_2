import React from "react";
import { SlOptions } from "react-icons/sl";
import Link from "next/link";
import Page from "../../_components/_Page/Page";
import Button from "@/app/_components/Button";
import { FaPlay } from "react-icons/fa";
import { RxShuffle } from "react-icons/rx";

function LikedMusics() {
  // 여기서 좋아요 누른 노래들 불러와주기
  // const likedMusics = await getLikedMusic()
  return (
    <Page title="좋아요 한 노래" isNav={true}>
      <div className="flex w-full gap-x-6 mb-10">
        <Button className="w-full py-3 flex items-center justify-center gap-x-4 text-xl">
          <FaPlay /> PLAY
        </Button>
        <Button className="w-full py-3 flex items-center justify-center gap-x-4 text-xl">
          <RxShuffle /> SHUFFLE
        </Button>
      </div>
      <div>
        <ul>
          {/* {likedMusics.map((likedMusic) => (
          <li key={likedMusic.id} className="flex gap-x-5 h-28 p-4 items-center">
            <button
              // onClick={노래 재생}
              className="bg-white/20 h-full aspect-square"
            >
              <div className="opacity-0 bg-black/20 w-full h-full relative hover:opacity-50">
                <FaPlay className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <img src={likedMusic.imgUrl} alt={likedMusic.노래제목} />
              </div>
            </button>
            <div className="grid grid-cols-4 w-full">
              <span className="col-span-2 text-lg">
                <Link
                  href="/해당 노래 디테일 페이지로 이동"
                  className="hover:underline"
                >
                  {likedMusic.노래제목}
                </Link>
              </span>
              <span className="col-span-1 text-lg">
                <Link
                  href="/해당 가수 정보 디테일 페이지로 이동"
                  className="hover:underline"
                >
                  {likedMusic.가수}
                </Link>
              </span>
              <span className="col-span-1 text-lg ml-auto">
                <button>
                  <SlOptions />
                </button>
              </span>
            </div>
          </li>
          ))} */}
        </ul>
      </div>
    </Page>
  );
}

export default LikedMusics;
