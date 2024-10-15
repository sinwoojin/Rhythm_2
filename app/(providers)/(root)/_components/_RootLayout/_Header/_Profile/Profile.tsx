"use client";

import { getUser } from "@/api/getUser";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";
import { UserMetadata } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Profile() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const logOut = useAuthStore((state) => state.LogOut);
	const modal = useModalStore((state) => state.setIsModal);
	const router = useRouter();

	const handleClickSignOutButton = () => {
		supabase.auth.signOut();
	};
	const handleClickProfile = async () => {
		const response = await getUser();
		console.log(response);

		if (!response) return;
		let userId;
		if (!response.user_metadata.sub) {
			// supabase id
			userId = response.user_metadata.sub;
		} else {
			// spotify id
			userId = response.id;
		}
		router.push(`/profile-detail/${userId}`);
	};

	const [user, setUser] = useState<UserMetadata | null>(null);
	useEffect(() => {
		(async () => {
			if (isLoggedIn) {
				const profile = await getUser();
				setUser(profile!);
			} else {
				logOut();
			}
		})();
	}, [isLoggedIn]);

	return isLoggedIn ? (
		// 여기는 이제 로그인 했을때 사용자 id랑
		<button
			id="profile"
			className="flex items-center px-2 py-3 gap-x-2 mb-5 w-full"
			onClick={handleClickProfile}
		>
			<div
				id="profile-img"
				className="rounded-full bg-gray-400 min-w-8 aspect-square text-gray-100 "
			>
				{/* <img src=""/> */}
				{/* 이미지 주소에 사용자 프로필 사진 주소 넣으면 됨 */}
			</div>
			{/* 여기에 사용자 id 넣기 */}
			<div className="flex justify-between w-full">
				<span className="text-sm font-medium">
					{user?.display_name}
				</span>
				<button onClick={handleClickSignOutButton}>
					<span className="text-sm font-sm">로그아웃</span>
				</button>
			</div>
		</button>
	) : (
		<button
			id="profile"
			className="flex items-center px-1 py-3 gap-x-2 mb-5"
			onClick={() => modal(true)}
		>
			<div
				id="profile-img"
				className="rounded-full bg-gray-400 min-w-8 aspect-square text-gray-100 "
			>
				{/* <img src=""/> */}
				{/* 이미지 주소에 사용자 프로필 사진 주소 넣으면 됨 */}
			</div>

			<span className="text-sm font-medium">로그인</span>
		</button>
	);
}

export default Profile;
