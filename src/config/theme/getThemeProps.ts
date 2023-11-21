import {PaletteMode, ThemeOptions} from '@mui/material';
import {grey} from '@mui/material/colors';

export const getPalette = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          text: {
            primary: '#000',
            secondary: '#5c5c5c',
          },
          background: {
            default: '#fff',
            paper: '#fff',
          },
          grey: {
            A100: '#eaecf0',
            A200: '#98a2b3',
            A400: '#797979',
            A700: '#494949',
          },
        }
      : {
          text: {
            primary: grey[100],
            secondary: grey[400],
          },
          background: {
            default: grey[900],
            paper: grey[900],
          },
          grey: {
            A100: grey[600],
            A200: grey[500],
            A400: grey[300],
            A700: grey[100],
          },
        }),
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: ({theme}) => ({
          '&:hover': {
            backgroundColor: theme.palette.grey.A100,
          },
        }),
      },
    },
  },
});
