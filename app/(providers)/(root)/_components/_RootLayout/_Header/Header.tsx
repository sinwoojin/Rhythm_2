import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="w-[245px] h-full fixed left-0 top-0 bg-black text-white">
      <h1 className="my-6 ml-10">
        <Link href="/" className="flex items-center">
          <span className="font-black text-lg mr-2">SKN</span>
          <span className="text-3xl font-bold tracking-wide">RHYTHM</span>
        </Link>
      </h1>
      <nav className="px-6">
        <div id="profile" className="flex items-center px-1 py-3 gap-x-2 mb-5">
          <div
            id="profile-img"
            className="rounded-full bg-gray-400 w-10 h-10 text-gray-100"
          >
            {/* <img src=""/> */}
            {/* 이미지 주소에 사용자 프로필 사진 주소 넣으면 됨 */}
          </div>
          <span className="text-lg font-medium">userName</span>
        </div>
        <div>
          <input
            type="text"
            className="py-[10px] pl-11 pr-9 text-xl rounded-md max-w-full bg-white bg-opacity-15 outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-blue-500/50 focus:bg-opacity-20"
            placeholder="RHYTHM 검색"
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
