import React, { PropsWithChildren } from "react";
import Header from "./_components/_RootLayout/_Header/Header";
import MusicPlayer from "./_components/_RootLayout/_MusicPlayer/MusicPlayer";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex">
        <Header />
        {children}
      </div>
      <MusicPlayer />
    </>
  );
}

export default RootLayout;
