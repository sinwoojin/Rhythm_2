"use client";

import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Nav() {
	const [selectedTab, setSelectedTab] = useState("노래");

	const pathname = usePathname();

	useEffect(() => {
		if (pathname === "/my/likedMusic") setSelectedTab("노래");
		else if (pathname === "/my/playlist") setSelectedTab("플레이리스트");
	}, [pathname]);

	return (
		<nav className="mb-10">
			<ul className="flex gap-x-4 ">
				<li
					className={cx("text-lg font-semibold pb-[2px] ", {
						"border-b-2 border-red-500 ": selectedTab === "노래",
					})}
				>
					<Link href="/my/likedMusic">노래</Link>
				</li>
				<li
					className={cx("text-lg font-semibold pb-[2px]  ", {
						"border-b-2 border-red-500":
							selectedTab === "플레이리스트",
					})}
				>
					<Link href="/my/playlist">플레이리스트</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
