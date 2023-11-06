import theme from '@/styles/theme/commonTheme';
import {CssBaseline, ThemeProvider} from '@mui/material';
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
