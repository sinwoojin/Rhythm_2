"use client";

import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";

function Profile() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const modal = useModalStore((state) => state.setIsModal);

  const handleClickSignOutButton = () => {
    supabase.auth.signOut();
  };

  return isLoggedIn ? (
    // 여기는 이제 로그인 했을때 사용자 id랑
    <button
      id="profile"
      className="flex items-center px-2 py-3 gap-x-2 mb-5 w-full"
    >
      <div
        id="profile-img"
        className="rounded-full bg-gray-400 min-w-10 aspect-square text-gray-100 "
      >
        {/* <img src=""/> */}
        {/* 이미지 주소에 사용자 프로필 사진 주소 넣으면 됨 */}
      </div>
      {/* 여기에 사용자 id 넣기 */}
      <div className="flex justify-between w-full">
        <span className="text-lg font-medium">userName</span>
        <button onClick={handleClickSignOutButton}>
          <span className="text-lg font-sm">로그아웃</span>
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
        className="rounded-full bg-gray-400 w-10 h-10 text-gray-100 "
      >
        {/* <img src=""/> */}
        {/* 이미지 주소에 사용자 프로필 사진 주소 넣으면 됨 */}
      </div>

      <span className="text-lg font-medium">로그인</span>
    </button>
  );
}

export default Profile;
