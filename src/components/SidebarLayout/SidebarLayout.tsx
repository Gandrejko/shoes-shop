import {Box, SxProps} from '@mui/material';
import {ReactNode} from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';

const styles: Record<string, SxProps> = {
  layout: {
    display: 'flex',
  }
};

type SidebarLayoutProps = {
  children: ReactNode;
  currentTab?: 'products' | 'settings' | 'logout';
};

export const SidebarLayout = ({children, currentTab}: SidebarLayoutProps) => {

  return (
    <Box sx={styles.layout}>
      <Sidebar
        currentTab={currentTab} />
      {children}
    </Box>
  );
};
