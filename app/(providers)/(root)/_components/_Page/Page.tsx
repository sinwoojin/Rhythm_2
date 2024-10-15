import { PropsWithChildren } from "react";
import Nav from "./_Nav/Nav";

interface PageProps {
  title?: string;
  isNav?: boolean;
}

function Page({ children, title, isNav }: PropsWithChildren<PageProps>) {
  return (
    <main className="ml-[245px] min-w-[calc(100%-245px)] min-h-[calc(100vh-87px)] mb-[87px] overflow-y-auto h-full px-8 pt-10 bg-[#121212]  text-white">
      <h2 className="text-4xl font-bold mb-10">{title}</h2>
      {isNav ? <Nav /> : null}
      {children}
    </main>
  );
}

export default Page;
