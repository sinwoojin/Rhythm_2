"use client";

import { api } from "@/api/spotifyApi";
import LogInModal from "@/app/(providers)/_components/LogInModal";
import { baseURL } from "@/config/config";

import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";
import { useRouter } from "next/navigation";

function Profile() {
  const currentUser = useAuthStore((state) => state.currentUser);

  // const [userName, setUserName] = useState("");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  // const logOut = useAuthStore((state) => state.LogOut);
  const openModal = useModalStore((state) => state.openModal);
  const router = useRouter();

  const handleClickSignOutButton = () => {
    supabase.auth.signOut();
  };
  const handleClickProfile = async () => {
    const response = await api.getUser.getUser();

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

  // useEffect(() => {
  //   (async () => {
  //     if (isLoggedIn) {
  //       const response = await api.getUser.getUser();
  //       if (response?.app_metadata.provider === "spotify") {
  //         setUserName(response?.user_metadata.name);
  //       } else if (response?.app_metadata.provider === "email") {
  //         setUserName(response?.user_metadata.display_name);
  //       }
  //     } else {
  //       logOut();
  //     }
  //   })();
  // }, [isLoggedIn]);

  return (
    <>
      {isAuthInitialized &&
        (isLoggedIn ? ( // 여기는 이제 로그인 했을때 사용자 id랑
          <div
            className="flex items-center px-2 py-3 gap-x-2 mb-5 w-full"
            onClick={handleClickProfile}
          >
            <div
              id="profile-img"
              className="rounded-full bg-gray-400 min-w-10 aspect-square text-gray-100 mr-1"
            >
              <img
                src={baseURL + currentUser?.imgUrl}
                alt=""
                className="aspect-square max-w-10 rounded-full bg-gray-400"
              />
              {/* 이미지 주소에 사용자 프로필 사진 주소 넣으면 됨 */}
            </div>
            {/* 여기에 사용자 id 넣기 */}
            <div className="flex justify-between w-full">
              <span className="text-sm font-medium">
                {currentUser?.userName}
              </span>
              <button onClick={handleClickSignOutButton}>
                <span className="text-sm font-sm">로그아웃</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            id="profile"
            className="flex items-center px-1 py-3 gap-x-2 mb-5"
            onClick={() =>
              openModal({ element: <LogInModal />, backdrop: true })
            }
          >
            <div
              id="profile-img"
              className="rounded-full bg-gray-400 min-w-8 aspect-square text-gray-100 "
            ></div>

            <span className="text-sm font-medium">로그인</span>
          </button>
        ))}
    </>
  );
}

export default Profile;