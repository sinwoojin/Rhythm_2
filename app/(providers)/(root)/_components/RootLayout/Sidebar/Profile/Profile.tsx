'use client';

import LogInModal from '@/app/(providers)/_components/LogInModal/LogInModal';
import { baseURL } from '@/config/config';

import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import Link from 'next/link';

function Profile() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const openModal = useModalStore((state) => state.openModal);

  const handleClickSignOutButton = () => {
    supabase.auth.signOut();
  };

  return (
    <>
      {isAuthInitialized &&
        (isLoggedIn ? (
          <div className="flex justify-between">
            <Link
              href={`/profiles/${currentUser?.id}`}
              className="flex items-center pl-2 py-3 gap-x-2 w-full"
            >
              <div
                id="profile-img"
                className="rounded-full bg-gray-400 min-w-8 max-w-8 aspect-square text-gray-100 mr-1 overflow-hidden"
              >
                <img
                  src={baseURL + currentUser?.imgUrl}
                  alt=""
                  className="w-full h-full object-cover bg-gray-400"
                />
              </div>
              <div className="flex justify-between w-full">
                <span className="text-sm font-medium truncate w-[70px]">
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
            className="pl-2 py-3 gap-x-2 font-semibold text-gray-400"
            onClick={() =>
              openModal({ element: <LogInModal />, backdrop: true })
            }
          >
            로그인하기
          </button>
        ))}
    </>
  );
}

export default Profile;
