import {useState} from 'react';
import {
  Box,
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

const styles: Record<string, SxProps> = {
  mobileWrapper: {
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  boxWrapper: {
    width: '260px',
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

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
      <Toolbar sx={styles.mobileWrapper}>
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={35.31}
            height={26.52}
          />
        </Link>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => {}}>
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
            <List sx={styles.tabs}>
              <ListItem sx={styles.tab}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/myProducts.svg"
                  alt="my-products"
                />
                <Typography>My products</Typography>
              </ListItem>
              <ListItem sx={styles.tab}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/settings.svg"
                  alt="settings"
                />
                <Typography>Settings</Typography>
              </ListItem>
              <ListItem sx={styles.tab}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/logout.svg"
                  alt="logout"
                />
                <Typography>Log out</Typography>
              </ListItem>
            </List>
          ) : (
            <List sx={styles.tabs}>
              <ListItem sx={styles.tab}>
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
