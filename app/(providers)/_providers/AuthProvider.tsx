"use client";

import { Database } from "@/database.types";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";

import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const logIn = useAuthStore((state) => state.LogIn);
  const logOut = useAuthStore((state) => state.LogOut);

  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);

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

  return children;
}

export default AuthProvider;
