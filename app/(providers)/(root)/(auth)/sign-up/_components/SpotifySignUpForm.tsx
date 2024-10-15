"use client";

import Button from "@/app/_components/Button";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { FaSpotify } from "react-icons/fa";

function SpotifyLogInPage() {
  const router = useRouter();
  const handleClickSpotifyLogIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
    });

    if (error) {
      console.error("Error with Spotify login:", error.message);
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
