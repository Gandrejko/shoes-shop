import {createTheme, responsiveFontSizes} from '@mui/material';
import {inter, workSans} from './fonts';

let theme = createTheme({
  palette: {
    mode: 'light',
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
    fontWeightBold: 600,
    fontSize: 16,
    allVariants: {
      fontWeight: 500,
    },

    h1: {
      fontSize: 45,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({theme}) => ({
          border: 1,
          borderColor: theme.palette.grey[400],
          borderRadius: theme.spacing(),
        }),
        input: ({theme}) => ({
          fontSize: 15,
          fontWeight: 300,
          color: theme.palette.grey[400],
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({theme}) => ({
          fontSize: 15,
          color: theme.palette.grey[400],
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({theme}) => ({
          fontFamily: inter.style.fontFamily,
          fontSize: 12,
          fontWeight: 300,
          color: theme.palette.error.main,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({theme}) => ({
          textTransform: 'none',
          backgroundColor: theme.palette.common.white,
        }),
        contained: ({theme}) => ({
          backgroundColor: theme.palette.error.main,
        }),
        outlined: ({theme}) => ({
          color: theme.palette.error.main,
          borderColor: theme.palette.error.main,
          borderRadius: theme.spacing(),
        }),
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
