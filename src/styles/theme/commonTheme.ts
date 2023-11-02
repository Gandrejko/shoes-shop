import {createTheme} from '@mui/material';
import {Work_Sans} from 'next/font/google';

const workSans = Work_Sans({
  weight: ['300', '400', '500', '600'],
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
});

const theme = createTheme({
  typography: {
    fontFamily: workSans.style.fontFamily,
    fontSize: 16,
    fontWeightRegular: 500,
  },
});

export default theme;
