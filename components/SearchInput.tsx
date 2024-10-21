/* eslint-disable prefer-const */
'use client';
import { useRouter } from 'next/navigation'; // useRouter 사용
import { ChangeEvent, KeyboardEvent, useState } from 'react';

function SearchInput() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 로컬 상태에 입력값 저장
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?search=${encodeURIComponent(inputValue)}`); // 페이지 이동
    }
  };

  return (
    <input
      type="text"
      className="py-[10px] pl-[44px] pr-9 rounded-md w-full h-10 bg-white/10 outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-blue-500/50 focus:bg-opacity-20 text-[17px]"
      placeholder="RHYTHM 검색"
      value={inputValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress} // 엔터로 검색 실행
    />
  );
}

export default SearchInput;
