'use client';

import { Database } from '@/database.types';
import { supabase } from '@/supabase/client';
import { useAuthStore } from '@/zustand/authStore';

import { PropsWithChildren, useEffect } from 'react';
import LogInInfoToast from '../_components/LogInInfoToast';

function AuthProvider({ children }: PropsWithChildren) {
  const logIn = useAuthStore((state) => state.LogIn);
  const logOut = useAuthStore((state) => state.LogOut);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);

  // 로그인 상태 확인, 로그인 정보 supabase에 넣기
  useEffect(() => {
    (async () => {
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session && session.provider_token) {
          window.localStorage.setItem(
            'spotify_provider_token',
            session.provider_token,
          );
        }
        if (session?.user) {
          logIn();

          (async () => {
            const user = session.user;

            if (user.app_metadata.provider === 'email') {
              setTimeout(() => {
                <LogInInfoToast type="supabase" />;
              }, 5000);
            } else if (user.app_metadata.provider === 'spotify') {
              <LogInInfoToast type="spotify" />;
            }

            const id = user.id;
            const userName =
              user.user_metadata?.full_name || user.user_metadata.display_name;
            const email = String(user.email);

            const data: Database['public']['Tables']['users']['Insert'] = {
              id,
              userName,
              email,
            };

            await supabase.from('users').upsert(data);

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
            };

            setCurrentUser(currentUser);
          })();
        } else {
          logOut();
        }
        setAuthInitialized();
      });
    })();
  }, [setCurrentUser]);

  return children;
}

export default AuthProvider;
