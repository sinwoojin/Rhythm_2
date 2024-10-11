"use client";

import Button from "@/app/_components/Button";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";

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
			type="button"
			className="mt-5"
		>
			SpotifySignUpForm
		</Button>
	);
}

export default SpotifyLogInPage;
