import {
  AppBar,
  Box,
  Divider,
  SxProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useState} from 'react';
import Modal from './components/Modal';
import DesktopHeader from './components/DesktopHeader';
import MobileHeader from './components/MobileHeader';

const styles: Record<string, SxProps> = {
  appBar: {
    position: 'sticky',
    border: 'none',
    boxShadow: 'none',
    backgroundImage: 'none',
    backgroundColor: 'background.paper',
  },
  container: {
    maxWidth: 1850,
    width: 1,
    marginX: 'auto',
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

  const handleSearch = (value: string) => {
    setOpen(false);
    router.push(
      {
        pathname: '/products',
        query: {
          searchingString: value,
        },
      },
      undefined,
      {shallow: true},
    );
  };

  return (
    <>
      <AppBar sx={styles.appBar}>
        <Box sx={styles.container}>
          {isMobileMode ? (
            <MobileHeader
              userLoggedIn={status !== 'unauthenticated'}
              handleModalOpen={() => setOpen(true)}
            />
          ) : (
            <DesktopHeader
              userLoggedIn={status !== 'unauthenticated'}
              handleModalOpen={() => setOpen(true)}
            />
          )}
        </Box>
        <Divider />
      </AppBar>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSearch={handleSearch}
      />
    </>
  );
};

export default Header;
