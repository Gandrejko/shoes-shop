import {Box, SxProps} from '@mui/material';
import {ReactNode} from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';

const styles: Record<string, SxProps> = {
  layout: {
    display: 'flex',
  },
  sidebar: {
    width: 320,
    flexShrink: 0,
    display: {md: 'block', xs: 'none'},
  },
  content: {
    flex: 1,
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
      <Box sx={styles.content}>
        {children}
      </Box>
    </Box>
  );
};
