import {PaletteMode, ThemeOptions} from '@mui/material';
import {blue, blueGrey, grey, indigo, purple} from '@mui/material/colors';

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
            default: '#141a1f',
            paper: '#141a1f',
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
