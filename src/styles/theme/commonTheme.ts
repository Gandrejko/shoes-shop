import {createTheme, responsiveFontSizes} from '@mui/material';
import {inter, workSans} from './fonts';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {main: '#fe645e'},
    error: {main: '#fe645e'},
    text: {
      primary: '#000',
      secondary: '#5c5c5c',
    },
    background: {
      default: '#fff',
    },
    grey: {
      A100: '#eaecf0',
      A200: '#98a2b3',
      A400: '#797979',
      A700: '#494949',
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
    MuiInputBase: {
      styleOverrides: {
        root: ({theme}) => ({
          borderStyle: 'solid',
          borderRadius: theme.spacing(),
          borderColor: theme.palette.grey[700],
          padding: ['15px', '16px'].join(' '),
        }),

        input: ({theme}) => ({
          fontSize: 15,
          fontWeight: 300,
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({theme}) => ({
          fontSize: 15,
          color: theme.palette.grey[700],
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({theme}) => ({
          fontFamily: inter.style.fontFamily,
          fontSize: 12,
          fontWeight: 400,
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: ({theme}) => ({
          color: theme.palette.common.white,
        }),
        outlined: ({theme}) => ({
          borderRadius: theme.spacing(),
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({theme}) => ({
          borderWidth: 1,
          borderColor: theme.palette.grey.A100,
        }),
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
