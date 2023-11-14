import {Box, SxProps} from '@mui/material';
import {ReactNode} from 'react';
import Header from '../Header';

const styles: Record<string, SxProps> = {
  layout: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  children: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'visible',
  },
};

type HeaderLayoutProps = {
  children: ReactNode;
};

const HeaderLayout = ({children}: HeaderLayoutProps) => {
  return (
    <Box sx={styles.layout}>
      <Header />
      <Box sx={styles.children}>{children}</Box>
    </Box>
  );
};

export default HeaderLayout;