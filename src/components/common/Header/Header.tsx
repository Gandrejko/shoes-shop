import {AppBar, Divider, SxProps, useTheme, useMediaQuery} from '@mui/material';
import MobileHeader from './components/MobileHeader';
import DesktopHeader from './components/DesktopHeader';
import {Modal} from '../Modal/Modal';
import {useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import theme from '@/config/theme';

const styles: Record<string, SxProps> = {
  appBar: {
    position: 'sticky',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    border: 'none',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down('md')]: {
      zIndex: theme.zIndex.drawer - 1,
    },
  },
};

export type HeaderProps = {
  userLoggedIn: boolean;
  handleModalOpen: () => void;
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobileMode = useMediaQuery(theme.breakpoints.down('md'));
  const {status} = useSession();
  const router = useRouter();

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleSearchClick = (value: string) => {
    setOpen(false);
    router.push('/products', {
      query: {
        searchingString: value,
      },
    });
  };

  return (
    <>
      <AppBar sx={styles.appBar}>
        {isMobileMode ? (
          <MobileHeader
            userLoggedIn={status !== 'unauthenticated'}
            handleModalOpen={handleModalOpen}
          />
        ) : (
          <DesktopHeader
            userLoggedIn={status !== 'unauthenticated'}
            handleModalOpen={handleModalOpen}
          />
        )}
        <Divider />
      </AppBar>
      <Modal
        isOpen={open}
        handleClose={handleModalClose}
        handleSearchClick={handleSearchClick}
      />
    </>
  );
};

export default Header;
