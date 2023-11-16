import {useState} from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  SwipeableDrawer,
  SxProps,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import {HeaderProps} from '@/components/Header';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar/Sidebar';
import {useRouter} from 'next/navigation';

const styles: Record<string, SxProps> = {
  modal: {
    '& .MuiModal-backdrop': {
      backgroundColor: '#F3F3F3',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
  },
  mobileWrapper: {
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  boxWrapper: {
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
  },
  closeBtnWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: '10px',
    marginRight: '10px',
  },
  sidebar: {
    paddingTop: '60px',
  },
  tabs: {
    marginTop: '80px',
    marginLeft: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
  },
  tab: {
    display: 'flex',
    gap: '15px',
    listStyle: 'none',
  },
};

const MobileHeader = ({userLoggedIn, handleModalOpen}: HeaderProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
      <Toolbar sx={styles.mobileWrapper}>
        <Link href="/products">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={35.31}
            height={26.52}
          />
        </Link>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => router.push('/cart')}>
            <Image src="/icons/cart.svg" alt="cart" width={20} height={20} />
          </IconButton>
          <IconButton onClick={handleModalOpen}>
            <Image
              src="/icons/search.svg"
              alt="search"
              width={20}
              height={20}
            />
          </IconButton>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <Image
              src="/icons/burgerMenu.svg"
              alt="menu"
              width={20}
              height={20}
            />
          </IconButton>
        </Stack>
      </Toolbar>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        anchor="right"
        sx={styles.modal}
      >
        <Box sx={styles.boxWrapper}>
          <Box sx={styles.closeBtnWrapper}>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <Image
                src="/icons/burgerClose.svg"
                alt="close"
                width={20}
                height={20}
              />
            </IconButton>
          </Box>
          {userLoggedIn ? (
            <Box sx={styles.sidebar}>
              <Divider />
              <Sidebar closeDrawer={() => setOpenDrawer(false)} />
            </Box>
          ) : (
            <List sx={styles.tabs}>
              <ListItem
                sx={styles.tab}
                onClick={() => {
                  router.push('/auth/sign-in');
                  setOpenDrawer(false);
                }}
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/login.svg"
                  alt="login"
                />
                <Typography>Log in</Typography>
              </ListItem>
            </List>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default MobileHeader;
