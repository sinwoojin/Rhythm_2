import { supabase } from "@/supabase/client";

const getUser = async () => {
	const response = await supabase.auth.getUser();
	const data = response.data.user;
	return data;
};

const getUserApi = {
	getUser,
};

export default getUserApi;
