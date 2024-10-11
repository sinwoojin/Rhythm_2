import React, { PropsWithChildren } from "react";
import Header from "./_components/_RootLayout/_Header/Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default RootLayout;
