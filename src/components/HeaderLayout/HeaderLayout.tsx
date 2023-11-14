import {Box} from '@mui/material';
import {ReactNode} from 'react';
import Header from '../Header';

type HeaderLayoutProps = {
  children: ReactNode;
};

const HeaderLayout = ({children}: HeaderLayoutProps) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default HeaderLayout;
