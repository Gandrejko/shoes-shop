import {getPalette} from '@/config/theme/getThemeProps';
import {Theme, createTheme} from '@mui/material';
import {createContext, useMemo, useState} from 'react';
import commonTheme from '.';

type ContextProps = {
  toggleTheme: () => void;
  theme: Theme;
};

const ColorModeContext = createContext({} as ContextProps);

const useColorMode = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = useMemo(() => {
    return createTheme(commonTheme, getPalette(mode));
  }, [mode]);

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme] as [typeof theme, typeof toggleTheme];
};

export {useColorMode};
export default ColorModeContext;
