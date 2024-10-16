"use client";

import { api } from "@/api/spotifyApi";
import { supabase } from "@/supabase/client";
import { useImgStore } from "@/zustand/imgStore";
import { PropsWithChildren, useEffect, useState } from "react";

function ImgProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState("");
  const [editImgUrl, setEditImgUrl] = useState<string | null>("");
  const setImgUrl = useImgStore((state) => state.setImgUrl);

  useEffect(() => {
    (async () => {
      const response = await api.getUserApi.getUser();
      if (!response) return;
      setUserId(response.id);

      if (response.id) {
        const user = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();
        setEditImgUrl(user.data?.imgUrl ?? null);

        setImgUrl(String(editImgUrl));
      }
    })();
  }, []);
  return children;
}

export default ImgProvider;
