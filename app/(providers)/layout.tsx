'use client';
import { PropsWithChildren } from 'react';
import AuthProvider from './_providers/AuthProvider';
import ModalProvider from './_providers/ModalProvider';
import TanstackQueryProvider from './_providers/TanStackQueryProvider';

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <ModalProvider>
        <AuthProvider>{children}</AuthProvider>
      </ModalProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
