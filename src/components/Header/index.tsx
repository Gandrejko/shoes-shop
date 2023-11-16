import {AppBar, Divider, SxProps, useTheme} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileHeader from '@/components/Header/components/MobileHeader';
import DesktopHeader from '@/components/Header/components/DesktopHeader';
import {Modal} from '../Modal/Modal';
import {useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import theme from '@/styles/theme/commonTheme';

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
    const newQuery = {
      ...router.query,
      searchingString: value,
    };
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <>
      <AppBar sx={styles.appBar}>
        {isMobileMode ? (
          <MobileHeader
            userLoggedIn={!(status === 'unauthenticated')}
            handleModalOpen={handleModalOpen}
          />
        ) : (
          <DesktopHeader
            userLoggedIn={!(status === 'unauthenticated')}
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
