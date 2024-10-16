"use client";
import { Track } from "@/schema/type";
import Link from "next/link";
import Page from "../_Page/Page";

interface ChartListProps {
  bestMusics: Track[];
  title: string;
}

function Musics({ bestMusics, title }: ChartListProps) {
  console.log(bestMusics);

  return (
    <>
      <h3 className="text-2xl mb-5 font-bold">{title}</h3>
      {bestMusics.length > 0 ? (
        <ul className="flex gap-x-4 mb-4 overflow-auto scrollbar-hide">
          {bestMusics.map((bestMusic) => (
            <li
              key={bestMusic.id}
              className="flex flex-col gap-y-2 min-w-[17%]"
            >
              <Link
                href={
                  "/" /*여기에 디테일 페이지로 넘어갈 동적 url 적기 지금은 비워둠*/
                }
              >
                <img src={bestMusic.album.images[0].url} />
                <p className="text-xl font-semibold">{bestMusic.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Page>검색 결과가 존재하지 않습니다</Page>
      )}
    </>
  );
}

export default Musics;
