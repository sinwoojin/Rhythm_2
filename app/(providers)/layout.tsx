'use client';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './_providers/AuthProvider';
import ModalProvider from './_providers/ModalProvider';
import SpotifyProvider from './_providers/SpotifyProvider';
import TanstackQueryProvider from './_providers/TanStackQueryProvider';

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <ModalProvider>
        <AuthProvider>
          <SpotifyProvider>
            {children}
            <ToastContainer limit={4} />
          </SpotifyProvider>
        </AuthProvider>
      </ModalProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
