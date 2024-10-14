"use client";

import Button from "@/app/_components/Button";
import { supabase } from "@/supabase/client";
import { FaSpotify } from "react-icons/fa";

function SpotifyLogInPage() {
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
			onClick={handleClickSpotifyLogIn}
			intent="spotify"
			size="lg"
			className="w-[400px] h-[60px] mt-5 flex items-center justify-center py-4 gap-x-3 hover:-translate-y-2 transition-all mx-auto"
		>
			<FaSpotify />
			Sign in with Spotify
		</Button>
	);
}

export default SpotifyLogInPage;
