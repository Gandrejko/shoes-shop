import Image from 'next/image';
import {useState} from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Divider,
  SwipeableDrawer,
  List,
  ListItem,
  SxProps, useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {SearchInput} from '@/components/Inputs/SearchInput';
import {CustomButton} from '@/components/Button/Button';

const styles: Record<string, SxProps> = {
  appBar: {
    height: '100%',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    border: 'none',
    boxShadow: 'none',
  },
  desktopWrapper: {
    height: '120px',
    display: 'flex',
    justifyContent: 'space-between',
  },
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
}

type HeaderProps = {
  userLoggedIn: boolean;
};

const DesktopHeader = ({userLoggedIn}: HeaderProps) => {
  return (
    <Toolbar sx={styles.desktopWrapper}>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Image src="/icons/logo.svg" alt="logo" width={40} height={30} />
        <Typography>Products</Typography>
      </Stack>
      {userLoggedIn ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
        >
          <SearchInput register={() => {}} validationSchema=""/>
          <Stack direction="row" spacing={0.5}>
            <IconButton onClick={() => {}}>
              <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
            </IconButton>
            <IconButton onClick={() => {}}>
              <Image
                src="icons/avatar.svg"
                alt="avatar"
                width={24}
                height={24}
              />
            </IconButton>
          </Stack>
        </Stack>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
        >
          <CustomButton width="145px" height="48px" isTransparent={true}>
            Sign In
          </CustomButton>
          <SearchInput register={() => {}} validationSchema=""/>
          <IconButton onClick={() => {}}>
            <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
          </IconButton>
        </Stack>
      )}
    </Toolbar>
  );
};

const MobileHeader = ({userLoggedIn}: HeaderProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
      <Toolbar sx={styles.mobileWrapper}>
        <Image src="/icons/logo.svg" alt="logo" width={35.31} height={26.52} />
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => {}}>
            <Image src="/icons/cart.svg" alt="cart" width={20} height={20} />
          </IconButton>
          <IconButton onClick={() => {}}>
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

export const Header = () => {
  const theme = useTheme();
  const isMobileMode = useMediaQuery(theme.breakpoints.down('md'));
  const userLoggedIn = false;

  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <AppBar sx={styles.appBar}>
        {isMobileMode ? (
          <MobileHeader userLoggedIn={userLoggedIn} />
        ) : (
          <DesktopHeader userLoggedIn={userLoggedIn} />
        )}
        <Divider />
      </AppBar>
    </Box>
  );
};
