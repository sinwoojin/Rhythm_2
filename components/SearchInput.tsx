/* eslint-disable prefer-const */
"use client";

import { useRouter } from "next/navigation"; // useRouter 사용
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useSearch } from "../context/SearchContext";

function SearchInput() {
  const { setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 로컬 상태에 입력값 저장
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(inputValue); // 검색어 저장
      router.push(`/search?search=${encodeURIComponent(inputValue)}`); // 페이지 이동
    }
  };

  return (
    <input
      type="text"
      className="py-[10px] pl-10 pr-9 text-base rounded-md max-w-full bg-white bg-opacity-15 outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-blue-500/50 focus:bg-opacity-20"
      placeholder="RHYTHM 검색"
      value={inputValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress} // 엔터로 검색 실행
    />
  );
}

export default SearchInput;
