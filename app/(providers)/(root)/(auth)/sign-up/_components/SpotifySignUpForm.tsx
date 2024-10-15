"use client";

import Button from "@/app/_components/Button";
import { Database } from "@/database.types";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { FaSpotify } from "react-icons/fa";

function SpotifyLogInPage() {
  const router = useRouter();
  const handleClickSpotifyLogIn = async () => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
    });
    if (error) {
      console.error("Error with Spotify login:", error.message);
    }

    // spotify 로그인 정보 users에 넣기
    if (data) {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        console.error("User not found after login.");
        return;
      }

      const userId = user.data.user.id;
      const userName =
        user.data.user?.user_metadata?.full_name ?? "Unknown User";
      const email = user.data.user?.email ?? "no-email@example.com";

      const data: Database["public"]["Tables"]["users"]["Insert"] = {
        userId,
        userName,
        email,
      };

      const response = await supabase.from("users").insert(data);
      console.log(response);
    } else {
      return alert("오류입니다");
    }
  };

  return (
    <Button
      intent="spotify"
      size="lg"
      type="button"
      className="w-[400px] h-[60px] mt-5 flex items-center justify-center py-4 gap-x-3 hover:-translate-y-2 transition-all mx-auto"
      onClick={handleClickSpotifyLogIn}
    >
      <FaSpotify />
      Sign in with Spotify
    </Button>
  );
}

export default SpotifyLogInPage;
