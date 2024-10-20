import { PropsWithChildren, Suspense } from 'react';
import Header from './_components/RootLayout/Header/Header';
import MusicPlayer from './_components/RootLayout/MusicPlayer/MusicPlayer';

function RootLayout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <Header />
      {children}
      <MusicPlayer />
    </Suspense>
  );
}

export default RootLayout;
