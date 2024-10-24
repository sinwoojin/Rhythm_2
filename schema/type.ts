/**
 * 앨범 타입
 */
export interface Album {
  id: string;
  name: string;
  release_date: string;
  description: string;
  artists: { id: string; name: string }[];
  tracks: {
    href: string;
    total: number;
    items: Track[];
  };
  images: {
    url: string;
  }[];
  uri: string;
}

/**
 * 트랙 타입
 */
export type Track = {
  id: string; // 트랙 ID
  name: string; // 트랙 이름
  artists: {
    id: string; // 아티스트 ID
    name: string; // 아티스트 이름
  }[]; // 아티스트 배열
  // 기타 트랙 관련 속성이 필요한 경우 추가
  album: Album;
  images: {
    url: string;
  }[];
  uri: string;
};

/**
 * 플레이리스트 타입
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
  uri: string;
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

/**
 * 카테고리 타입
 */
export type Category = {
  href: string;
  items: {
    icons: {
      url: string;
    }[];
    id: string;
    name: string;
  }[];
  limit: string;
  next: string;
  offset: number;
  total: number;
};

/**
 * 재생중인 노래 타입
 */
export type PlayTrack = {
  album: {
    images: {
      url: string;
    }[];
    name: string;
    uri: string;
  };
  artists: {
    name: string;
    uri: string;
    url: string;
  }[];
  id: string;
  name: string;
  uid: string;
  uri: string;
};
