"use client";

import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const regEmail =
	/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const regPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

function SIgnUpForm() {
	const LogIn = useAuthStore((state) => state.isLogIn);
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [userName, setUserName] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleChangeUserName: ComponentProps<"input">["onChange"] = (e) => {
		const userName = e.target.value;
		setUserName(userName);
	};
	const handleChangeEmail: ComponentProps<"input">["onChange"] = (e) => {
		const email = e.target.value;
		setEmail(email);
	};

	const handleChangePassword: ComponentProps<"input">["onChange"] = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleChangePasswordConfirm: ComponentProps<"input">["onChange"] = (
		e
	) => {
		const passwordConfirm = e.target.value;
		setPasswordConfirm(passwordConfirm);
	};

	const handleSubmitSignUp: ComponentProps<"form">["onSubmit"] = async (
		e
	) => {
		e.preventDefault();

		if (!userName) return alert("사용자 이름을 입력해주세요");

		// 이메일 양식이 맞는지 확인하는 코드
		if (!regEmail.test(email))
			return alert(
				"잘못된 이메일 주소입니다. example@email.com 형식으로 입력되었는지 확인하세요."
			);

		//비밀번호의 양식이 맞는지 확인
		if (!regPassword.test(password))
			return alert(
				"비밀번호는 영문 숫자를 조합하여 8자리 이상 입력해주세요"
			);

		// 두 비밀번호가 서로 일치하는지 확인
		if (password !== passwordConfirm)
			return alert("비밀번호를 맞게 입력해주세요");

		//회원가입 api에 data를 전송하기 위한 데이터
		const data = {
			email,
			password,
		};

		//api 요청을 보내야 할 곳
		const signUp = await supabase.auth.signUp(data);
		if (signUp.error) return alert("로그인에 실패 하였습니다");
		LogIn();
		router.push("/");
	};

	return (
		<div className="bg-black bg-opacity-90  w-[calc(100%-245px)] ml-[245px] grid place-content-center min-h-[calc(100vh-87px)]">
			<form
				onSubmit={handleSubmitSignUp}
				className="px-10 py-10 rounded-md items-center items-center  bg-slate-800 w-[800px]"
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
						<label
							htmlFor="email"
							className="w-[40%] text-center text-white"
						>
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
								type={isPasswordVisible ? "text" : "password"}
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
								onClick={() =>
									setIsPasswordVisible((prev) => !prev)
								}
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
