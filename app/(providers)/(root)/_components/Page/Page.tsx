import { PropsWithChildren } from 'react';
import Nav from './Nav/Nav';

interface PageProps {
  title?: string;
  isNav?: boolean;
}

function Page({ children, title, isNav }: PropsWithChildren<PageProps>) {
  return (
    <main className="pl-[320px] pr-[75px] pt-[60px] pb-[calc(29rem/4)] w-full h-full bg-[#121212] text-white">
      {!!title ? <h2 className="text-4xl font-bold mb-10">{title}</h2> : null}
      {isNav ? <Nav /> : null}
      {children}
    </main>
  );
}

export default Page;
