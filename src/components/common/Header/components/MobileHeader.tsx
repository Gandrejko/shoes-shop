import Sidebar from '@/components/common/Sidebar/Sidebar';
import ColorModeContext from '@/config/theme/ColorModeContext';
import {DarkMode, LightMode} from '@mui/icons-material';
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
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useContext, useState} from 'react';
import {HeaderProps} from '../Header';

const styles: Record<string, SxProps> = {
  modal: {
    '& .MuiModal-backdrop': {
      backgroundColor: 'grey.A100',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
  },
  mobileWrapper: {
    height: '60px',
    display: {xs: 'flex', md: 'none'},
    justifyContent: 'space-between',
    backgroundColor: 'background.paper',
  },
  boxWrapper: {
    width: 280,
    height: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background.paper',
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
    cursor: 'pointer',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: 'primary.main',
    },
  },
};

const MobileHeader = ({userLoggedIn, handleModalOpen}: HeaderProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const {theme, toggleTheme} = useContext(ColorModeContext);
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
            style={{
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(1)'
                  : 'brightness(0)',
            }}
          />
        </Link>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton aria-label="Toggle theme" onClick={toggleTheme}>
            {theme.palette.mode === 'light' ? (
              <DarkMode sx={{color: '#000', fontSize: 23}} />
            ) : (
              <LightMode sx={{color: '#fff', fontSize: 23}} />
            )}
          </IconButton>
          <IconButton onClick={() => router.push('/cart')}>
            <Image
              src="/icons/cart.svg"
              alt="cart"
              width={20}
              height={20}
              style={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(10)'
                    : 'brightness(1)',
              }}
            />
          </IconButton>
          <IconButton onClick={handleModalOpen}>
            <Image
              src="/icons/search.svg"
              alt="search"
              width={20}
              height={20}
              style={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(10)'
                    : 'brightness(1)',
              }}
            />
          </IconButton>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <Image
              src="/icons/burgerMenu.svg"
              alt="menu"
              width={20}
              height={20}
              style={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(10)'
                    : 'brightness(1)',
              }}
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
        swipeAreaWidth={0}
      >
        <Box sx={styles.boxWrapper}>
          <Box sx={styles.closeBtnWrapper}>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <Image
                src="/icons/burgerClose.svg"
                alt="close"
                width={20}
                height={20}
                style={{
                  filter:
                    theme.palette.mode === 'dark'
                      ? 'brightness(10)'
                      : 'brightness(1)',
                }}
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
                  style={{
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(10)'
                        : 'brightness(1)',
                  }}
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
