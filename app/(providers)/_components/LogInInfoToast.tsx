'use client';

import { useState } from 'react';

type LogInInfoToastProps = {
  type: string;
};

function LogInInfoToast({ type }: LogInInfoToastProps) {
  const [logInType, setLogInType] = useState('');
  if (type === 'email') {
    setLogInType('email로 로그인 하셨습니다.');
  } else {
    setLogInType('spotify로 로그인');
  }
  return (
    <div className="fixed t-0 right-0 border border-white">
      <p>{logInType}</p>
    </div>
  );
}

export default LogInInfoToast;
