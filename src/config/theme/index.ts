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
    MuiCssBaseline: {
      styleOverrides: theme => ({
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.grey[300]} transparent`,
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            width: '18px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            backgroundColor: theme.palette.grey[300],
            transition: 'background-color 0.3s ease-in-out',
            border: '5px transparent solid',
            backgroundClip: 'padding-box',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: theme.palette.grey[400],
            },
        },
      }),
    },
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
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: ({theme}) => ({
          color: theme.palette.common.white,
          border: `1px solid ${theme.palette.primary.main}`,
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.common.white,
          },
        }),
        outlined: ({theme}) => ({
          borderRadius: theme.spacing(),
          border: `1px solid ${theme.palette.primary.main}`,
          '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
          },
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
