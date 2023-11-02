import {createTheme} from '@mui/material';
import {Work_Sans} from 'next/font/google';

const workSans = Work_Sans({
  weight: ['300', '400', '500', '600'],
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
});

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0a1047',
    },
    secondary: {
      main: '#6e314a',
    },
    error: {
      main: '#fe645e',
    },
    text: {
      primary: '#000',
      secondary: '#5c5c5c',
    },
    background: {
      default: '#fff',
    },
    grey: {
      A100: '#98a2b3',
      A200: '#797979',
      A400: '#494949',
      A700: '#0d0d0d',
    },
  },

  typography: {
    fontFamily: workSans.style.fontFamily,
    fontSize: 16,
    fontWeightRegular: 500,

    h1: {
      fontSize: 45,
    },
  },
});

export default theme;
