import {Box, SxProps} from '@mui/material';
import {ReactNode} from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';

const styles: Record<string, SxProps> = {
  layout: {
    display: 'flex',
    height: '100%',
  },
  sidebar: {
    width: 320,
    height: '100%',
    flexShrink: 0,
    display: {md: 'block', xs: 'none'},
  },
  children: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'visible',
  },
};

type SidebarLayoutProps = {
  children: ReactNode;
  currentTab?: 'products' | 'settings' | 'logout';
};

export const SidebarLayout = ({children, currentTab}: SidebarLayoutProps) => {
  return (
    <Box sx={styles.layout}>
      <Box sx={styles.sidebar}>
        <Sidebar currentTab={currentTab} />
      </Box>
      <Box sx={styles.children}>{children}</Box>
    </Box>
  );
};
