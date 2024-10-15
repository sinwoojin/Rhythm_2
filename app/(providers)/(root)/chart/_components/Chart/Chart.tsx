interface ChartProps {
	title: string;
}

function Chart({ title }: ChartProps) {
	return (
		<div className="">
			<h2 className="font-bold text-2xl mb-5">{title}</h2>
			{/* 그리드 활용해 3 * 3으로 보여주기  */}
			<div className="grid grid-rows-3 grid-cols-3 gap-x-5 gap-y-4 ">
				{/* 이게 하나 */}
				<div className="w-full flex gap-x-4">
					<div className="w-[100px] bg-white aspect-square" />
					<div className=" items-center justify-center h-full flex">
						<p>1</p>
					</div>
					<div className="flex flex-wrap flex-col gap-y-2">
						<p>노래 제목</p>
						<p>가수 이름</p>
					</div>
				</div>
				<div className="w-[100px] bg-white aspect-square" />
				<div className="w-[100px] bg-white aspect-square" />
				<div className="w-[100px] bg-white aspect-square" />
				<div className="w-[100px] bg-white aspect-square" />
				<div className="w-[100px] bg-white aspect-square" />
				<div className="w-[100px] bg-white aspect-square" />
				<div className="w-[100px] bg-white aspect-square" />
				<div className="w-[100px] bg-white aspect-square" />
			</div>
		</div>
	);
}

export default Chart;
