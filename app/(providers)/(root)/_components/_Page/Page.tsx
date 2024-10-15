import { PropsWithChildren } from "react";

interface PageProps {
	title?: string;
}

function Page({ children, title }: PropsWithChildren<PageProps>) {
	return (
		<main className="ml-[245px] min-w-[calc(100%-245px)] min-h-[calc(100vh-87px)] mb-[116px] overflow-y-auto h-full px-8 pt-10 bg-[#121212]  text-white">
			<h2 className="text-4xl font-bold mb-10">{title}</h2>
			{children}
		</main>
	);
}

export default Page;
