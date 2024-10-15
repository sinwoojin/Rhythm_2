/**
 * 앨범 타입
 */
export interface Album {
  id: string;
  name: string;
  release_date: string;
  artists: { id: string; name: string }[];
  tracks: {
    items: { id: string; name: string; artists: { name: string }[] }[];
  };
  images: {
    url: string;
  }[];
}

/**
 * 앨범 트랙 타입
 */
type Track = {
  id: string; // 트랙 ID
  name: string; // 트랙 이름
  artists: {
    id: string; // 아티스트 ID
    name: string; // 아티스트 이름
  }[]; // 아티스트 배열
  // 기타 트랙 관련 속성이 필요한 경우 추가
  album: Album;
};

/**
 * 플레이리스트 타입(상세페이지)
 */
export type Playlist = {
  id: string; // 플레이리스트 ID
  name: string; // 플레이리스트 이름
  description: string; // 플레이리스트 설명
  public: boolean; // 공개 여부
  tracks: {
    href: string; // 트랙 링크
    total: number; // 총 트랙 수
    items: {
      track: Track; // 트랙 정보
    }[];
  }; // 트랙 정보
  // 기타 플레이리스트 관련 속성이 필요한 경우 추가
  images: {
    url: string;
  }[];
};

/**
 * 유저 정보 타입
 */
export type User = {
  id: string;
  userName: string;
  email: string;
  createdAt: string;
  content: string | null;
  imgUrl: string | null;
};

export const baseURL =
  "https://xjhwxeroazisrpjjskgz.supabase.co/storage/v1/object/public/";
