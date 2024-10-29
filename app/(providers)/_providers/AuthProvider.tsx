'use client';

import { getRefreshToken } from '@/api/getToken';
import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';
import useSpotifyStore from '@/zustand/spotifyStore';

import { PropsWithChildren, useEffect } from 'react';

function AuthProvider({ children }: PropsWithChildren) {
  const logIn = useAuthStore((state) => state.LogIn);
  const logOut = useAuthStore((state) => state.LogOut);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);
  const setSpotifyAccessToken = useSpotifyStore(
    (state) => state.setAccessToken,
  );
  const setSpotifyRefreshToken = useSpotifyStore(
    (state) => state.setRefreshToken,
  );
  const refreshToken = useSpotifyStore((state) => state.refreshToken);

  // 로그인 상태 확인, 로그인 정보 supabase에 넣기
  useEffect(() => {
    (async () => {
      supabase.auth.onAuthStateChange((_event, session) => {
        if (
          session &&
          session.provider_token &&
          session.provider_refresh_token
        ) {
          setSpotifyAccessToken(session.provider_token);
          setSpotifyRefreshToken(session.provider_refresh_token);
        }

        if (session?.user) {
          logIn();

          (async () => {
            const user = session.user;
            const id = user.id;

            const loggedUser = await supabase
              .from('users')
              .select('*')
              .eq('id', id)
              .single();
            if (!loggedUser) return;

            const currentUser = {
              id,
              userName: loggedUser.data!.userName,
              email: loggedUser.data!.email,
              content: loggedUser.data!.content ?? '',
              imgUrl: loggedUser.data!.imgUrl ?? '',
              spotifyId: user.identities?.[0].id,
            };

            setCurrentUser(currentUser);
          })();
        } else {
          logOut();
        }
        setAuthInitialized();
      });
    })();
  }, []);
  useEffect(() => {
    setInterval(async () => {
      if (!refreshToken) return;
      const newAccessToken = await getRefreshToken(refreshToken);

      if (!newAccessToken) return;
      // #1. 스토어에 있는 리프레시 토큰을 사용해서 스포티파이로부터 새로운 엑세스토큰과 리프레시토큰을 받아오기
      console.log(newAccessToken);
      setSpotifyAccessToken(newAccessToken);
      setSpotifyRefreshToken(newAccessToken);
    }, 3420000);
  }, []);

  return children;
}

export default AuthProvider;
