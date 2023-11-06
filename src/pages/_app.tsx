import theme from '@/styles/theme/commonTheme';
import {CssBaseline, ThemeProvider} from '@mui/material';
import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
