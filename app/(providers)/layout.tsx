"use client";
import { PropsWithChildren } from "react";
import AuthProvider from "./_providers/AuthProvider";
import ImgProvider from "./_providers/ImgProvider";
import ModalProvider from "./_providers/ModalProvider";
import TanstackQueryProvider from "./_providers/TanStackQueryProvider";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <ImgProvider>
        <ModalProvider>
          <AuthProvider>{children}</AuthProvider>
        </ModalProvider>
      </ImgProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
