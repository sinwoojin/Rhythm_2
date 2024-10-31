import Link from 'next/link';

function Footer() {
  return (
    <footer className="pl-[320px] pr-[75px] pb-[160px] pt-20 w-full bg-rhythmBlack text-white flex flex-col text-sm">
      <div className="container mx-auto flex flex-col items-center space-y-3 opacity-65">
        <p className="text-sm">© 2024 리듬 | 모든 권리 보유 할걸?.</p>
        <nav className="flex space-x-4">
          <Link href="#" className="text-sm hover:underline">
            이용약관
          </Link>
          <Link
            href={'https://github.com/ScriptKnights/Rhythm'}
            className="hover:underline"
            target="_blank"
          >
            git 주소
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
