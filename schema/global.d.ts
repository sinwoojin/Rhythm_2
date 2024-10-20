// src/global.d.ts
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }) => {
        addListener: (
          event: string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (...args: any[]) => void,
        ) => void;
        connect: () => Promise<void>;
        togglePlay: () => Promise<void>;
        queue: (trackUri: string) => Promise<boolean>; // queue 메서드 추가
      };
    };
  }
}

export {};
