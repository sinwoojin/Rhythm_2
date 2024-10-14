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
		router.push("/");
	};

	return (
		<Button
			onClick={handleClickSpotifyLogIn}
			intent="spotify"
			size="lg"
			type="button"
			className=" flex items-center w-full h-full justify-center py-4 gap-x-3"
		>
			<FaSpotify />
			Sign in with Spotify
		</Button>
	);
}

export default SpotifyLogInPage;
