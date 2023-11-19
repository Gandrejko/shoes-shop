import {Box, SxProps} from '@mui/material';
import {ReactNode} from 'react';
import Sidebar from '@/components/common/Sidebar/Sidebar';

const styles: Record<string, SxProps> = {
  layout: {
    display: 'flex',
  },
  sidebar: {
    width: 320,
    position: 'sticky',
    top: 0,
    height: '100%',
    display: {md: 'block', xs: 'none'},
  },
  children: {
    flex: 1,
    height: '100%',
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
