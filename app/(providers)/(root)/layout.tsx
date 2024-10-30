import { PropsWithChildren, Suspense } from 'react';
import 'swiper/css';
import Footer from './_components/RootLayout/Footer/Footer';
import MusicPlayer from './_components/RootLayout/MusicPlayer/MusicPlayer';
import Sidebar from './_components/RootLayout/Sidebar/Sidebar';

function RootLayout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <Sidebar />
      {children}
      <Footer />
      <MusicPlayer />
    </Suspense>
  );
}

export default RootLayout;
