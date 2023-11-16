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
    fontWeightLight: 300,
    fontWeightBold: 600,

    allVariants: {
      fontWeight: 500,
    },

    h1: {
      fontSize: 45,
    },
    h2: {
      fontSize: 25,
    },
    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 18,
    },

    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 12,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: ({theme}) => ({
          borderRadius: theme.spacing(),
          padding: ['7px', '16px'].join(' '),
        }),

        input: ({theme}) => ({
          fontSize: 15,
          fontWeight: 400,
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
          color: theme.palette.error.main,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          whiteSpace: 'nowrap',
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
    MuiCheckbox: {
      styleOverrides: {
        root: ({theme}) => ({
          borderWidth: 1,
          borderRadius: 2,
          borderColor: theme.palette.grey.A700,
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: ({theme}) => ({
          padding: 0,
          '&.Mui-focused': {
            border: 'none', // Встановіть бажаний стиль для рамки, наприклад, 'none' для видалення рамки
          },
        }),
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
