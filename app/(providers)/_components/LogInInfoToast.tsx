'use client';

import { useLogInInfoStore } from '@/zustand/logInInfoStore';
import { useState } from 'react';

type LogInInfoToastProps = {
  type: string;
};

function LogInInfoToast({ type }: LogInInfoToastProps) {
  const [logInType, setLogInType] = useState('');
  const closeToast = useLogInInfoStore((state) => state.closeToast);
  if (type === 'email') {
    setTimeout(() => {
      setLogInType('supabase 로그인 하셨습니다. 일부 기능이 제한됩니다');
      closeToast();
    }, 5000);
  } else {
    setLogInType('spotify로 로그인 되었습니다.');
    closeToast();
  }

  return (
    <div className="fixed top-0 right-0 border border-white">
      <p>{logInType}</p>
    </div>
  );
}

export default LogInInfoToast;
