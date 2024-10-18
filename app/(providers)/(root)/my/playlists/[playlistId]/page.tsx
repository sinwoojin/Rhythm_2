import React from "react";
import Page from "../../../_components/Page/Page";
import { FaPlay } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import PlaylistMusics from "./_PlaylistMusics/PlaylistMusics";

function PlayListDetail() {
  return (
    <Page>
      <article className="py-4 border-b mb-4 border-white">
        <div className="flex gap-x-6 mb-6 h-[200px]">
          <div className="aspect-square bg-white/20 h-full">
            {/* <img src="플리에 있는 첫 노래 썸네일" alt="플레이리스트 썸네일" /> */}
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-7xl font-bold line-clamp-1">
              TOP 50 - 대한민국
              {/* 플리 제목 */}
            </h2>
            <span className="line-clamp-1">
              현재 가장 많이 재생된 트랙의 일일 업데이트입니다 - 대한민국.
              {/* 간단한 설명 */}
            </span>
            <div className="flex gap-x-4">
              <button className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl">
                <FaPlay />
              </button>
              <button className="text-5xl">
                <IoIosAddCircleOutline />
              </button>
            </div>
          </div>
        </div>
      </article>
      <article>
        <PlaylistMusics />
      </article>
    </Page>
  );
}

export default PlayListDetail;
