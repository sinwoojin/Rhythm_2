'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { Database } from '@/database.types';
import { supabase } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { ComponentProps, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const regEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const regPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

function SIgnUpForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userName, setUserName] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChangeUserName: ComponentProps<'input'>['onChange'] = (e) => {
    const userName = e.target.value;
    setUserName(userName);
  };
  const handleChangeEmail: ComponentProps<'input'>['onChange'] = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleChangePassword: ComponentProps<'input'>['onChange'] = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleChangePasswordConfirm: ComponentProps<'input'>['onChange'] = (
    e,
  ) => {
    const passwordConfirm = e.target.value;
    setPasswordConfirm(passwordConfirm);
  };

  const handleSubmitSignUp: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault();

    if (!userName) return toast.error('사용자 이름을 입력해주세요');

    // 이메일 양식이 맞는지 확인하는 코드
    if (!regEmail.test(email))
      return toast.error(
        '잘못된 이메일 주소입니다. example@email.com 형식으로 입력되었는지 확인하세요.',
      );

    //비밀번호의 양식이 맞는지 확인
    if (!regPassword.test(password))
      return toast.warn(
        '비밀번호는 영문 숫자를 조합하여 8자리 이상 입력해주세요',
      );

    // 두 비밀번호가 서로 일치하는지 확인
    if (password !== passwordConfirm)
      return toast.warn('비밀번호를 올바르게 입력해주세요');

    //api 요청을 보내야 할 곳
    const signUp = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: userName } },
    });

    // 입력한 데이터를 users 테이블에 저장하기 (content 제외)
    const user = await supabase.auth.getUser();

    if (!user) return;

    const id = user.data.user!.id;

    const data: Database['public']['Tables']['users']['Insert'] = {
      id,
      userName,
      email,
    };

    await supabase.from('users').insert(data);
    toast.success('회원가입에 성공 하셨습니다.');

    if (!signUp.data.user) return toast.error('로그인에 실패 하였습니다.');
    router.push('/');
  };

  return (
    <div className="bg-[#121212] bg-opacity-95  w-[calc(100%-245px)] ml-[245px] grid place-content-center min-h-[calc(100vh-87px)]">
      <form
        onSubmit={handleSubmitSignUp}
        className="px-10 py-10 rounded-md items-center  bg-[#121212] w-[800px]"
      >
        <h2 className="font-bold text-white text-3xl mb-5 text-center">
          회원가입
        </h2>
        <div className="w-[90%] flex flex-wrap items-center gap-y-5 mx-auto">
          <div className="flex w-full items-center">
            <label
              htmlFor="userName"
              className="w-[40%] text-center text-white"
            >
              사용자 이름
            </label>
            <Input
              id="userName"
              placeholder="필수 입력"
              value={userName}
              onChange={handleChangeUserName}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="email" className="w-[40%] text-center text-white">
              이메일
            </label>
            <Input
              placeholder="example@email.com "
              type="text"
              id="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="flex w-full items-center">
            <label
              htmlFor="password"
              className="w-[40%] text-center text-white"
            >
              비밀번호
            </label>
            <div className="flex items-center w-full relative">
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                className="relative"
                value={password}
                onChange={handleChangePassword}
                placeholder="영문 숫자를 포함하여 8글자 이상 작성"
              />
              <Button
                type="button"
                intent="none"
                className="h-[56px] absolute right-2 bg-none"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </div>
          </div>
          <div className="flex w-full items-center">
            <label
              htmlFor="passwordConfirm"
              className="w-[40%] text-center text-white"
            >
              비밀번호 확인
            </label>
            <Input
              placeholder="위와 동일한 비밀번호 입력"
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={handleChangePasswordConfirm}
            />
          </div>
          <Button className="w-full mt-5 py-6">회원가입 하기</Button>
        </div>
      </form>
    </div>
  );
}

export default SIgnUpForm;
