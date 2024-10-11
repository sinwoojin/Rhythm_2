"use client";

function SignUpPage() {
	return (
		<form>
			<label htmlFor="userName">유저 이름</label>
			<input type="text" id="userName" />

			<label htmlFor="email">이메일</label>
			<input type="text" id="email" />

			<label htmlFor="password">비밀번호</label>
			<input type="password" id="password" />

			<label htmlFor="passwordFirm"></label>
		</form>
	);
}

export default SignUpPage;
