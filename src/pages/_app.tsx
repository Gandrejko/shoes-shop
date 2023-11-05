import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useState} from 'react';

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
