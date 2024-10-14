"use client";

import { api } from "@/api/spotify.api";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";

function Profile() {
	const response = api.ProfileAPI.getProfile();
	console.log(response);
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const modal = useModalStore((state) => state.setIsModal);

	return !isLoggedIn ? (
		<button
			id="profile"
			className="flex items-center px-1 py-3 gap-x-2 mb-5"
			onClick={() => modal(true)}
		>
			<div
				id="profile-img"
				className="rounded-full bg-gray-400 w-10 h-10 text-gray-100 "
			>
				{/* <img src=""/> */}
				{/* 이미지 주소에 사용자 프로필 사진 주소 넣으면 됨 */}
			</div>

			<span className="text-lg font-medium">userName</span>
		</button>
	) : (
		// 여기는 이제 로그인 했을때 사용자 id랑
		<div id="profile" className="flex items-center px-1 py-3 gap-x-2 mb-5">
			<div
				id="profile-img"
				className="rounded-full bg-gray-400 w-10 h-10 text-gray-100 "
			>
				{/* <img src=""/> */}
				{/* 이미지 주소에 사용자 프로필 사진 주소 넣으면 됨 */}
			</div>
			{/* 여기에 사용자 id 넣기 */}
			<span className="text-lg font-medium">로그인 됨</span>
			<button onClick={async () => await supabase.auth.signOut()}>
				로그 아웃
			</button>
		</div>
	);
}

export default Profile;
