"use client";

import { api } from "@/api/spotifyApi";
import { Database } from "@/database.types";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";

import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const logIn = useAuthStore((state) => state.LogIn);
  const logOut = useAuthStore((state) => state.LogOut);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);

  // 로그인 상태 확인, 로그인 정보 supabase에 넣기
  useEffect(() => {
    (async () => {
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          logIn();

          (async () => {
            const user = session.user;

            const id = user.id;
            const userName =
              user.user_metadata?.full_name || user.user_metadata.display_name;
            const email = String(user.email);

            const data: Database["public"]["Tables"]["users"]["Insert"] = {
              id,
              userName,
              email,
            };

            await supabase.from("users").upsert(data);
          })();
        } else {
          logOut();
        }
        setAuthInitialized();
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await api.getUser.getUser();
      if (!data) return;
      const id = data?.id;

      const loggedUser = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      if (!loggedUser) return;

      const currentUser = {
        id,
        userName: loggedUser.data!.userName,
        email: loggedUser.data!.email,
        content: loggedUser.data!.content ?? "",
        imgUrl: loggedUser.data!.imgUrl ?? "",
      };

      setCurrentUser(currentUser);
    })();
  }, []);

  return children;
}

export default AuthProvider;
