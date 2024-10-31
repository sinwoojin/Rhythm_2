import { supabase } from '@/supabase/client';

const getUser = async () => {
  const response = await supabase.auth.getUser();
  const data = response.data.user;
  return data;
};

const getUserProfiles = async () => {
  const response = await supabase.from('users').select('*');
  const data = response.data;
  return data;
};

const getUserApi = {
  getUser,
  getUserProfiles,
};
export default getUserApi;
