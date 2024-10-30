import { PropsWithChildren } from 'react';
import Nav from './Nav/Nav';

interface PageProps {
  title?: string;
  isNav?: boolean;
}

function Page({ children, title, isNav }: PropsWithChildren<PageProps>) {
  return (
    <main className="pl-[320px] pr-[75px] pt-[60px] pb-[160px] w-full h-full bg-rhythmBlack text-white flex flex-col">
      {!!title ? (
        <h2 className="text-4xl font-bold mb-10 shrink-0">{title}</h2>
      ) : null}
      {isNav ? <Nav /> : null}

      <div className="relative grow">{children}</div>
    </main>
  );
}

export default Page;
