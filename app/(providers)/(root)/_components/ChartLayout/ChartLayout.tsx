interface ChartProps {
  title: string;
}

function ChartLayout({ title }: ChartProps) {
  console.log(title);
  return null;
  //     <div className="[&+&]:mt-16 py-6 px-6">
  //       <h2 className="font-bold text-2xl mb-6">{title}</h2>
  //       {/* 그리드 활용해 3 * 3으로 보여주기  */}
  //       <ul className="grid grid-rows-3 gap-x-5 grid-flow-col gap-y-4 overflow-auto">
  //         {playListMusics.map((playListMusic) => (
  //           <li
  //             key={playListMusic.id}
  //             className="w-72 h-[50px] mr-5 flex gap-x-5"
  //           >
  //             {/* 이게 하나 */}
  //             <div className="h-full aspect-square bg-white">
  //               <img src="여기에 노래 썸네일" alt="" />
  //             </div>
  //             <div className="h-full">
  //               <p className="font-bold">{/* 순위 넣어주셈 idx */}</p>
  //             </div>
  //             <div className="w-full flex flex-col gap-y-[2px]">
  //               <p className="font-bold line-clamp-1">{/* 노래 제목 */}</p>
  //               <p className="text-sm text-white/50  line-clamp-1">
  //                 {/* 가수 이름 */}
  //               </p>
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
}

export default ChartLayout;
