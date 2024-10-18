'use client';

import LogInModal from '@/app/(providers)/_components/LogInModal';
import { baseURL } from '@/config/config';

import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import Link from 'next/link';

function Profile() {
  const currentUser = useAuthStore((state) => state.currentUser);

  // const [userName, setUserName] = useState("");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  // const logOut = useAuthStore((state) => state.LogOut);
  const openModal = useModalStore((state) => state.openModal);

  const handleClickSignOutButton = () => {
    supabase.auth.signOut();
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
          <div className="flex justify-between">
            <Link
              href={`/profiles/${currentUser?.id}`}
              className="flex items-center pl-2 py-3 gap-x-2 mb-5 w-full"
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
              </div>
              <div className="flex justify-between w-full">
                <span className="text-sm font-medium">
                  {currentUser?.userName}
                </span>
              </div>
            </Link>

            <div className="flex items-center pr-2 py-3 gap-x-2 mb-5 w-full justify-end">
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
