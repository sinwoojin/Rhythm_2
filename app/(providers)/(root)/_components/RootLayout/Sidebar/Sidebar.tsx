import Link from 'next/link';
import { BsFillTrophyFill, BsMusicNoteList } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { SiYoutubemusic } from 'react-icons/si';
import Profile from './Profile/Profile';
import SidebarNavItem from './SidebarNavItem';
import SidebarSearchInput from './SidebarSearchInput';

function Sidebar() {
  return (
    <header className="fixed left-0 w-[245px] h-screen bg-rhythm text-white py-8">
      <Link
        href="/today"
        className="flex items-center gap-x-1 px-5 text-center text-2xl font-black tracking-wide mb-5 hover:text-red-500 transition w-fit"
      >
        RHYTHM
      </Link>

      <nav className="px-5 grid grid-cols-1 gap-y-5">
        <Profile />

        <SidebarSearchInput />

        <div>
          <ul className="flex flex-col">
            <li>
              <SidebarNavItem
                href="/today"
                label="투데이"
                icon={<SiYoutubemusic />}
              />
            </li>
            <li>
              <SidebarNavItem
                href="/chart"
                label="차트"
                icon={<BsFillTrophyFill />}
              />
            </li>
            <li>
              <SidebarNavItem
                href="/user-rhythm"
                label="유저 리듬"
                icon={<BsMusicNoteList />}
              />
            </li>
            <li>
              <SidebarNavItem
                href="/my/likedMusic"
                label="MY"
                icon={<FaHeart />}
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Sidebar;
