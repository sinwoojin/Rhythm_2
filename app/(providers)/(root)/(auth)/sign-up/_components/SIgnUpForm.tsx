"use client";

import { ComponentProps, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const regEmail =
	/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const regPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

function SIgnUpForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const userNameRef = useRef<HTMLInputElement | null>(null);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

	const handleSubmitSignUp: ComponentProps<"form">["onSubmit"] = (e) => {
		e.preventDefault();

		if (!userNameRef.current) return alert("사용자 이름을 입력해주세요");
		const userName = userNameRef.current.value;

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
			userName,
			email,
			password,
		};

		//api 요청을 보내야 할 곳
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmitSignUp}>
			<label htmlFor="userName">사용자 이름</label>
			<input type="text" id="userName" ref={userNameRef} />
			<label htmlFor="email">이메일</label>
			<input
				type="text"
				id="email"
				value={email}
				onChange={handleChangeEmail}
			/>
			<div className="flex items-center">
				<label htmlFor="password">비밀번호</label>
				<input
					type={isPasswordVisible ? "text" : "password"}
					id="password"
					value={password}
					onChange={handleChangePassword}
					placeholder="영문 숫자를 포함하여 8글자 이상 작성"
				/>
				<button
					type="button"
					onClick={() => setIsPasswordVisible((prev) => !prev)}
				>
					{isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
				</button>
			</div>
			<label htmlFor="passwordConfirm">비밀번호 확인</label>
			<input
				type="password"
				id="passwordConfirm"
				value={passwordConfirm}
				onChange={handleChangePasswordConfirm}
			/>
			<button>회원가입 버튼</button>
		</form>
	);
}

export default SIgnUpForm;
