import { PropsWithChildren } from "react";
import Header from "./_components/RootLayout/Header/Header";
import MusicPlayer from "./_components/RootLayout/MusicPlayer/MusicPlayer";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <MusicPlayer />
    </>
  );
}

export default RootLayout;
