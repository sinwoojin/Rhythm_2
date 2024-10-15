import { supabase } from "@/supabase/client";

export const getUser = async () => {
	const response = await supabase.auth.getUser();
	const data = response.data.user?.user_metadata;
	return data;
};
