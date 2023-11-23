import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {type ReactElement, type ReactNode} from 'react';

import {CssBaseline, ThemeProvider} from '@mui/material';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SessionProvider} from 'next-auth/react';
import {ToastContainer} from 'react-toastify';

import ColorModeContext, {useColorMode} from '@/config/theme/ColorModeContext';
import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: {session, ...pageProps},
}: AppPropsWithLayout) {
  const [theme, toggleTheme] = useColorMode();

  const getLayout = Component.getLayout ?? (page => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ColorModeContext.Provider value={{theme, toggleTheme}}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
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
        </ColorModeContext.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
