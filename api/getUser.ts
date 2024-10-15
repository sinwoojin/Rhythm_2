import { supabase } from "@/supabase/client";

export const getUser = async () => {
	const response = await supabase.auth.getUser();
	const data = response.data.user;
	return data;
};
