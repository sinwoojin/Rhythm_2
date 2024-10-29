import { PropsWithChildren, Suspense } from 'react';
import 'swiper/css';
import MusicPlayer from './_components/RootLayout/MusicPlayer/MusicPlayer';
import Sidebar from './_components/RootLayout/Sidebar/Sidebar';

function RootLayout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <Sidebar />
      {children}
      <MusicPlayer />
    </Suspense>
  );
}

export default RootLayout;
