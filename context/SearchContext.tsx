import { createContext, PropsWithChildren, useContext, useState } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

//SearchContext 생성
const SearchContext = createContext<SearchContextType | undefined>(undefined);

//useSearch 커스텀 Hook 정의
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext); // SearchContext에서 현재 값 가져오기
  if (!context) {
    throw new Error("context error");
  }
  return context;
};

//SearchProvider 컴포넌트 정의
export function SearchProvider({ children }: PropsWithChildren) {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 초기화

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {" "}
      {/* 자식 컴포넌트에 값 제공 */}
      {children}
    </SearchContext.Provider>
  );
}
