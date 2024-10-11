"use client";

import { ComponentProps, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const regEmail =
	/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

function SIgnUpForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [visible, setVisible] = useState(false);
	const [type, setType] = useState("password");

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

	const handleClickSignUp: ComponentProps<"button">["onClick"] = (e) => {
		e.preventDefault();

		// 이메일 양식이 맞는지 확인하는 코드
		if (!regEmail.test(email))
			return alert(
				"잘못된 이메일 주소입니다. example@email.com 형식으로 입력되었는지 확인하세요."
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
		console.log(data);
	};

	/**
	 * 첫번째 입력받는 비밀번호의 타입을 text 또는 password로 바꿈
	 */
	const isClickPasswordToggle = () => {
		if (visible) {
			setType("password");
			setVisible(false);
		} else {
			setType("text");
			setVisible(true);
		}
		console.log(visible);
	};

	return (
		<form>
			<label htmlFor="userName">유저 이름</label>
			<input type="text" id="userName" />
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
					type={type}
					id="password"
					value={password}
					onChange={handleChangePassword}
				/>
				<div onClick={isClickPasswordToggle}>
					{visible ? <FaEye /> : <FaEyeSlash />}
				</div>
			</div>
			<label htmlFor="passwordConfirm">비밀번호 확인</label>
			<input
				type="password"
				id="passwordConfirm"
				value={passwordConfirm}
				onChange={handleChangePasswordConfirm}
			/>
			<button onClick={handleClickSignUp}>회원가입 하기</button>
		</form>
	);
}

export default SIgnUpForm;
