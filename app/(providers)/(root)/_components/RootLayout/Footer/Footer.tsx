import Link from 'next/link';
import { FaGithub, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="pl-[320px] pr-[75px] pt-[60px] pb-[calc(29rem/4)] w-full h-full bg-rhythmBlack text-white flex flex-col text-sm opacity-65 ">
      <div aria-label="notice" className="flex justify-between pb-5">
        <div>
          <ul className="flex gap-x-5">
            <li>리듬(주) 스크립트나이츠 </li>
            <li>팀장: 김서진</li>
            <li>조원: 이강희, 신현성, 신우진</li>
          </ul>
          <ul className="flex gap-x-5">
            <li>주소: 서울특별시 마포구 상암동 집가고싶다.</li>
            <li>대표 전화: 010-0101-1101</li>
          </ul>
        </div>
        <ul className="flex gap-x-5 text-3xl" aria-label="링크">
          <li>
            <Link
              href={'https://github.com/ScriptKnights/Rhythm'}
              className="hover:underline"
              target="_blank"
            >
              <FaGithub />
            </Link>
          </li>
          <li>
            <Link
              href={'https://www.youtube.com/watch?v=ekr2nIex040'}
              target="_blank"
            >
              <FaYoutube />
            </Link>
          </li>
        </ul>
      </div>
      <div className="container mx-auto flex flex-col items-center space-y-3 border-t border-gray-500/70 pt-5">
        <p className="text-sm">© 2024 리듬 | 모든 권리 보유 할걸?.</p>
        <nav aria-label="terms" className="flex space-x-4">
          <Link href="#" className="text-sm hover:underline">
            이용약관
          </Link>
          <Link href="#" className="text-sm hover:underline">
            문의하기
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
