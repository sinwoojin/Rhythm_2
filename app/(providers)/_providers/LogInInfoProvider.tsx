'use client';

import { supabase } from '@/supabase/client';
import { useLogInInfoStore } from '@/zustand/logInInfoStore';
import { PropsWithChildren, useEffect } from 'react';
import LogInInfoToast from '../_components/LogInInfoToast';

function LogInInfoProvider({ children }: PropsWithChildren) {
  const showToast = useLogInInfoStore((state) => state.showToast);

  useEffect(() => {
    (async () => {
      const userLogInInfo = await (
        await supabase.auth.getUser()
      ).data.user?.app_metadata.provider;
      if (userLogInInfo === 'email') {
        showToast({ element: <LogInInfoToast type="email" /> });
      } else {
        showToast({ element: <LogInInfoToast type="spotify" /> });
      }
    })();
  }, []);
  return children;
}

export default LogInInfoProvider;
