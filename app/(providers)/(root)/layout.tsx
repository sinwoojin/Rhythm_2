import React, { PropsWithChildren } from "react";
import Header from "./_components/_RootLayout/_Header/Header";
import MusicPlayer from "./_components/_RootLayout/_MusicPlayer/MusicPlayer";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Header />
        {children}
      </div>
      <MusicPlayer />
    </div>
  );
}

export default RootLayout;
