import SearchInput from "@/components/SearchInput";
import Link from "next/link";
import { BsFillTrophyFill, BsMusicNoteList } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import Profile from "./Profile/Profile";

function Header() {
  return (
    <header className="fixed left-0 w-72 h-screen bg-[#121212] text-white">
      <h1 className="my-6 ml-10">
        <Link href="/" className="flex items-center">
          <span className="font-black text-lg mr-2">SKN</span>
          <span className="text-3xl font-bold tracking-wide">RHYTHM</span>
        </Link>
      </h1>
      <nav className="px-6">
        <Profile />
        <div className="relative mb-16">
          <SearchInput />
          <span className="absolute text-[26px] top-2 left-1.5 text-gray-400">
            <CiSearch />
          </span>
        </div>
        <div>
          <ul className="flex flex-col gap-y-4">
            <Link href="/today">
              {/* 링크 URL은 페이지 만들면 카테고리에 맞춰서 넣어주세요 */}
              <li className="flex items-center gap-x-3 mx-[6px]">
                <span className="text-3xl text-gray-400">
                  <SiYoutubemusic />
                </span>
                <span className="text-[20px] text-gray-400">투데이</span>
              </li>
            </Link>
            <Link href="/chart">
              {/* 링크 URL은 페이지 만들면 카테고리에 맞춰서 넣어주세요 */}
              <li className="flex items-center gap-x-3 mx-[6px]">
                <span className="text-3xl text-gray-400">
                  <BsFillTrophyFill />
                </span>
                <span className="text-[20px] text-gray-400">차트</span>
              </li>
            </Link>
            <Link href="/user-rhythm">
              {/* 링크 URL은 페이지 만들면 카테고리에 맞춰서 넣어주세요 */}
              <li className="flex items-center gap-x-3 mx-[6px]">
                <span className="text-3xl text-gray-400">
                  <BsMusicNoteList />
                </span>
                <span className="text-[20px] text-gray-400">유저 리듬</span>
              </li>
            </Link>
            <Link href="/my/likedMusic">
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
