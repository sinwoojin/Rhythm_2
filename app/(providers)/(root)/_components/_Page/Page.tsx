import React, { PropsWithChildren } from "react";

interface PageProps {
  title: string;
}

function Page({ children, title }: PropsWithChildren<PageProps>) {
  return (
    <main className="w-full h-full px-11 pt-16 bg-[#121212] text-white">
      <h2 className="text-4xl font-bold mb-10">{title}</h2>
      {children}
    </main>
  );
}

export default Page;
