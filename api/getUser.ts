import { supabase } from "@/supabase/client";

export const getUser = async (userId: string) => {
  const response = await supabase
    .from("users")
    .select("*")
    .eq("userId", userId);

  const data = response.data;

  return data;
};
