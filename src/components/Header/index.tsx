import {AppBar, Divider, SxProps, useTheme} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileHeader from '@/components/Header/components/MobileHeader';
import DesktopHeader from '@/components/Header/components/DesktopHeader';
import {Modal} from '../Modal/Modal';
import {useState} from 'react';
import {useSession} from 'next-auth/react';

const styles: Record<string, SxProps> = {
  appBar: {
    position: 'static',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    border: 'none',
    boxShadow: 'none',
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

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleSearchClick = (value: string) => {
    setOpen(false);
    console.log(value);
  };

  return (
    <>
      <AppBar sx={styles.appBar}>
        {isMobileMode ? (
          <MobileHeader
            userLoggedIn={status === 'authenticated'}
            handleModalOpen={handleModalOpen}
          />
        ) : (
          <DesktopHeader
            userLoggedIn={status === 'authenticated'}
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
