import { PropsWithChildren } from "react";
import Nav from "./Nav/Nav";

interface PageProps {
  title?: string;
  isNav?: boolean;
}

function Page({ children, title, isNav }: PropsWithChildren<PageProps>) {
  return (
    <main className="pl-[calc(72rem/4)] pr-8 pt-10 pb-[calc(29rem/4)] w-full min-h-screen overflow-y-auto h-full bg-[#121212]  text-white">
      <h2 className="text-4xl font-bold mb-10">{title}</h2>
      {isNav ? <Nav /> : null}
      {children}
    </main>
  );
}

export default Page;
