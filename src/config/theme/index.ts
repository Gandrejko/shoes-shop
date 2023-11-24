import {createTheme, responsiveFontSizes} from '@mui/material';
import {inter, workSans} from './fonts';

let theme = createTheme({
  palette: {
    primary: {main: '#fe645e'},
    error: {main: '#fe645e'},
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
            backgroundColor: 'transparent',
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
          border: 'none',

          '&.Mui-focused': {
            borderColor: '#bdbdbd',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',

            borderColor: '#bdbdbd',
            backgroundColor: 'rgba(254, 100, 94, 0.04)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },

          '.MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
        }),
        select: {
          border: '2px solid #bdbdbd',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
