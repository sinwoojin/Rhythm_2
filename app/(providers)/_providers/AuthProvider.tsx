"use client";

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
        } else {
          logOut();
        }
        console.log(session?.user);
        setAuthInitialized();
      });
    })();
  }, [logIn, logOut, setAuthInitialized]);

  return children;
}

export default AuthProvider;
