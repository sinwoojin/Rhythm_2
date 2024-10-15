import { supabase } from "@/supabase/client";

const getUserSupabase = async () => {
	const response = await supabase.auth.getUser();
	const data = response.data.user;
	return data;
};

const getUserSpotify = async () => {
	const response = await supabase.auth.getUser();
	const data = response.data.user?.user_metadata;

	return data;
};

const getUserApi = {
	getUserSupabase,
	getUserSpotify,
};

export default getUserApi;
