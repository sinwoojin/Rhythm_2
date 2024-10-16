"use client";
import { Track } from "@/schema/type";
import Link from "next/link";
import Page from "../_Page/Page";

interface ChartListProps {
  bestMusics: Track[];
  title: string;
  round: boolean;
}

function ChartList({ bestMusics, title, round }: ChartListProps) {

  return (
    <>
      <h3 className="text-2xl mb-3 font-bold">{title}</h3>
      {bestMusics.length > 0 ? (
        <ul className="flex gap-x-3 overflow-auto scrollbar-hide w-[100vw]">
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
                {round === false ? (
                  bestMusic.images.length === 0 ? (
                    <img className="w-[318px] h-[318px] object-cover bg-slate-600" />
                  ) : (
                    <img
                      src={bestMusic.images[0].url}
                      className="w-[318px] h-[318px] object-contain"
                    />
                  )
                ) : bestMusic.images.length === 0 ? (
                  <img className="w-[318px] h-[318px] object-cover bg-slate-600" />
                ) : (
                  <img
                    src={bestMusic.images[0].url}
                    className="w-[318px] h-[318px] object-contain  rounded-full"
                  />
                )}

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

export default ChartList;
