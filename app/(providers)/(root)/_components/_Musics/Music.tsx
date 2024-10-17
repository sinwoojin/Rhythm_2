"use client";
import { Track } from "@/schema/type";
import Link from "next/link";
import Page from "../_Page/Page";

interface ChartListProps {
  musics: Track[];
  title: string;
}

function Musics({ musics, title }: ChartListProps) {
  return (
    <>
      <div className="[&+&]:mt-10">
        <h3 className="text-2xl font-bold">{title}</h3>
        {musics.length > 0 ? (
          <ul className="flex gap-x-3 overflow-auto scrollbar-hide">
            {musics.map((music) => (
              <li key={music.id} className="flex flex-col min-w-[17%]">
                <Link
                  href={
                    "/" /*여기에 디테일 페이지로 넘어갈 동적 url 적기 지금은 비워둠*/
                  }
                >
                  <img src={music.album.images[0].url} />
                  <p className="text-xl font-semibold">{music.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Page>검색 결과가 존재하지 않습니다</Page>
        )}
      </div>
    </>
  );
}

export default Musics;
