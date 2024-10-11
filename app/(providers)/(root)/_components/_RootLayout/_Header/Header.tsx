import Link from "next/link";
import React from "react";
import { BsFillTrophyFill, BsMusicNoteList } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";

function Header() {
  return (
    <header className="min-w-[245px] h-full bg-[#121212] text-white">
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
        <div className="relative mb-20">
          <input
            type="text"
            className="py-[10px] pl-14 pr-9 text-xl rounded-md max-w-full bg-white bg-opacity-15 outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-blue-500/50 focus:bg-opacity-20"
            placeholder="RHYTHM 검색"
          />
          <span className="absolute text-[26px] top-2 left-1.5 text-gray-400">
            <CiSearch />
          </span>
        </div>
        <div>
          <ul className="flex flex-col gap-y-4">
            <Link href="/">
              {/* 링크 URL은 페이지 만들면 카테고리에 맞춰서 넣어주세요 */}
              <li className="flex items-center gap-x-3 mx-[6px]">
                <span className="text-3xl text-gray-400">
                  <SiYoutubemusic />
                </span>
                <span className="text-[20px] text-gray-400">투데이</span>
              </li>
            </Link>
            <Link href="/">
              {/* 링크 URL은 페이지 만들면 카테고리에 맞춰서 넣어주세요 */}
              <li className="flex items-center gap-x-3 mx-[6px]">
                <span className="text-3xl text-gray-400">
                  <BsFillTrophyFill />
                </span>
                <span className="text-[20px] text-gray-400">차트</span>
              </li>
            </Link>
            <Link href="/">
              {/* 링크 URL은 페이지 만들면 카테고리에 맞춰서 넣어주세요 */}
              <li className="flex items-center gap-x-3 mx-[6px]">
                <span className="text-3xl text-gray-400">
                  <BsMusicNoteList />
                </span>
                <span className="text-[20px] text-gray-400">유저 리듬</span>
              </li>
            </Link>
            <Link href="/">
              {/* 링크 URL은 페이지 만들면 카테고리에 맞춰서 넣어주세요 */}
              <li className="flex items-center gap-x-3 mx-[6px]">
                <span className="text-3xl text-gray-400">
                  <FaHeart />
                </span>
                <span className="text-[20px] text-gray-400">MY</span>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
