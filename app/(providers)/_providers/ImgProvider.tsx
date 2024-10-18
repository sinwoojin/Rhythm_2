"use client";

import { api } from "@/api/spotifyApi";
import { supabase } from "@/supabase/client";
import { useImgStore } from "@/zustand/imgStore";
import { PropsWithChildren, useEffect, useState } from "react";

function ImgProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState("");
  const setImgUrl = useImgStore((state) => state.setImgUrl);
  const imgUrl = useImgStore((state) => state.imgUrl);

  useEffect(() => {
    (async () => {
      const response = await api.getUser.getUser();
      if (!response) return;
      setUserId(response.id);

      if (response.id) {
        const user = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        setImgUrl(user.data?.imgUrl ?? "");
      } else {
        console.error("이미지 에러입니다");
      }
    })();
  }, [userId, imgUrl]);
  return children;
}

export default ImgProvider;
