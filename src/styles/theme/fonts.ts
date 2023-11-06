import {Inter, Work_Sans} from 'next/font/google';

export const workSans = Work_Sans({
  weight: ['300', '400', '500', '600'],
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
  fallback: ['system-ui', 'arial'],
});

export const inter = Inter({
  weight: ['400', '500'],
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
  fallback: ['system-ui', 'arial'],
});
