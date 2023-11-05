import Image from 'next/image';
import {useState} from 'react';
import logo from '../../../public/icons/logo.svg';
import chart from '../../../public/icons/chart.svg';
import avatar from '../../../public/icons/avatar.svg';
import search from '../../../public/icons/search.svg';
import menu from '../../../public/icons/burgerMenu.svg';
import myProducts from '../../../public/icons/myProducts.svg';
import settings from '../../../public/icons/settings.svg';
import logout from '../../../public/icons/logout.svg';
import login from '../../../public/icons/login.svg';
import burgerClose from '../../../public/icons/burgerClose.svg';
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
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme} from '@mui/material';
import {SearchInput} from '@/components/Inputs/SearchInput';
import {CustomButton} from '@/components/Button/Button';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      largeSm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
});

const styles = {
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
    [theme.breakpoints.up('md')]: {
      '&.MuiToolbar-root': {
        paddingLeft: '40px',
        paddingRight: '40px',
      },
    },
    [theme.breakpoints.up('largeSm')]: {
      '&.MuiToolbar-root': {
        paddingLeft: '20px',
        paddingRight: '20px',
      },
    },
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
};

type HeaderProps = {
  userLoggedIn: boolean;
};

const DesktopHeader = ({userLoggedIn}: HeaderProps) => {
  return (
    <Toolbar sx={styles.desktopWrapper}>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Image src={logo} alt="logo" width={40} height={30} />
        <Typography>Products</Typography>
      </Stack>
      {userLoggedIn ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <SearchInput register={() => {}} validationSchema="" />
          <Stack direction="row" spacing={0.5}>
            <IconButton onClick={() => {}}>
              <Image src={chart} alt="chart" width={24} height={24} />
            </IconButton>
            <IconButton onClick={() => {}}>
              <Image src={avatar} alt="avatar" width={24} height={24} />
            </IconButton>
          </Stack>
        </Stack>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <CustomButton width="145px" height="48px" isTransparent={true}>
            Sign In
          </CustomButton>
          <SearchInput register={() => {}} validationSchema="" />
          <IconButton onClick={() => {}}>
            <Image src={chart} alt="chart" width={24} height={24} />
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
        <Image src={logo} alt="logo" width={35.31} height={26.52} />
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => {}}>
            <Image src={chart} alt="chart" width={20} height={20} />
          </IconButton>
          <IconButton onClick={() => {}}>
            <Image src={search} alt="search" width={20} height={20} />
          </IconButton>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <Image src={menu} alt="menu" width={20} height={20} />
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
              <Image src={burgerClose} alt="close" width={20} height={20} />
            </IconButton>
          </Box>
          {userLoggedIn ? (
            <List sx={styles.tabs}>
              <ListItem sx={styles.tab}>
                <Image
                  width={20}
                  height={20}
                  src={myProducts}
                  alt="my-products"
                />
                <Typography>My products</Typography>
              </ListItem>
              <ListItem sx={styles.tab}>
                <Image width={20} height={20} src={settings} alt="settings" />
                <Typography>Settings</Typography>
              </ListItem>
              <ListItem sx={styles.tab}>
                <Image width={20} height={20} src={logout} alt="logout" />
                <Typography>Log out</Typography>
              </ListItem>
            </List>
          ) : (
            <List sx={styles.tabs}>
              <ListItem sx={styles.tab}>
                <Image width={20} height={20} src={login} alt="login" />
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
  const isMobileMode = useMediaQuery(theme.breakpoints.down('largeSm'));
  const userLoggedIn = true;

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
