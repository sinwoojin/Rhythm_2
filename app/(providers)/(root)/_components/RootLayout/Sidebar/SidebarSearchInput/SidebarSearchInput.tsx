'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

function SidebarSearchInput() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // 로컬 상태에 입력값 저장
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?search=${encodeURIComponent(query)}`); // 페이지 이동
    }
  };

  return (
    <div className="relative flex items-center text-gray-400">
      <CiSearch className="text-2xl absolute left-2" />
      <input
        type="text"
        className="py-2.5 pr-4 pl-10 w-full bg-white/10 outline-none rounded-md focus:outline-2 focus:outline-blue-500/50 focus:bg-opacity-20 transition-all ease-in-out duration-300"
        placeholder="검색하기"
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress} // 엔터로 검색 실행
      />
    </div>
  );
}

export default SidebarSearchInput;
