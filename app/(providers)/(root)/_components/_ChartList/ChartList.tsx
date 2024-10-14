import Link from "next/link";
import React from "react";

interface ChartListProps {
  title: string;
  Chart: Array<{ id: number }>;
  // Chart의 Array의 제네릭으로 스포티파이에서 받는 값의 타입을 미리 다 지정해두면 됨
  // api쓰는법을 몰라서 아래 코드는 틀만 만둔 깡통이라 같은거만 보여주고 있슴다
}

function ChartList(props: ChartListProps) {
  return (
    <>
      <h3 className="text-2xl mb-5 font-bold">{props.title}</h3>
      <ul className="flex gap-x-4 overflow-x-auto">
        {props.Chart.map((chartContent) => (
          <li
            key={chartContent.id}
            className="flex flex-col gap-y-2 min-w-[17%]"
          >
            <Link
              href={
                "/" /*여기에 디테일 페이지로 넘어갈 동적 url 적기 지금은 비워둠*/
              }
            >
              <span className="text-xl font-bold">1</span>
              <div className="w-full aspect-square bg-white bg-opacity-10">
                노래 썸네일
              </div>
              <span className="text-xl font-semibold">노래 제목</span>
              <span className="text-base opacity-80">가수</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ChartList;
