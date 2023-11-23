import {Box, SxProps} from '@mui/material';
import {ReactNode, useRef} from 'react';
import Header from '@/components/common/Header/Header';
import ScrollToTop from '@/components/common/ScrollToTop/ScrollToTop';

const styles: Record<string, SxProps> = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  children: {
    overflowY: 'auto',
    height: '100%',
  },
};

type HeaderLayoutProps = {
  children: ReactNode;
};

const HeaderLayout = ({children}: HeaderLayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Box sx={styles.layout}>
      <Header />
      <Box ref={containerRef} sx={styles.children}>
        {children}
      </Box>
      <ScrollToTop containerRef={containerRef} />
    </Box>
  );
};

export default HeaderLayout;
