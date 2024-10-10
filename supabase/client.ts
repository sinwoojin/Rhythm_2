import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw new Error("URL이 존재하지 않습니다!");
if (!supabaseKey) throw new Error("API KEY가 존재하지 않습니다!");

export const supabase = createClient(supabaseUrl, supabaseKey);
