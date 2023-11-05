import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useState} from 'react';

export default function App({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
