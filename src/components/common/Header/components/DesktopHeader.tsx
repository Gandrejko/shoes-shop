import SearchInput from '@/components/common/SearchInput/SearchInput';
import ColorModeContext from '@/config/theme/ColorModeContext';
import {DarkMode, LightMode} from '@mui/icons-material';
import {
  Avatar,
  Button,
  IconButton,
  Link as MuiLink,
  Stack,
  SxProps,
  Toolbar,
  Typography,
} from '@mui/material';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useContext, useState} from 'react';
import {HeaderProps} from '../Header';
import {ProfilePopup} from './ProfilePopup';

const styles: Record<string, SxProps> = {
  desktopWrapper: {
    height: '120px',
    display: {xs: 'none', md: 'flex'},
    justifyContent: 'space-between',
    backgroundColor: 'background.paper',
  },
  link: {
    textDecoration: 'none',
    color: 'text.primary',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: 'primary.main',
    },
  },
  avatar: {
    width: 24,
    height: 24,
    border: '1px solid',
    borderColor: '#fff',
    backgroundColor: 'primary.main',
    color: 'common.white',
  },
};

const DesktopHeader = ({userLoggedIn, handleModalOpen}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();
  const {data} = useSession();
  const {theme, toggleTheme} = useContext(ColorModeContext);

  return (
    <>
      <Toolbar sx={styles.desktopWrapper}>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Link href="/products">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={40}
              height={30}
              style={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(1)'
                    : 'brightness(0)',
              }}
            />
          </Link>
          <MuiLink component={Link} href="/products" sx={styles.link}>
            <Typography variant="body1">Products</Typography>
          </MuiLink>
        </Stack>
        {userLoggedIn ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={4}
          >
            <SearchInput
              name="not-used-1"
              register={false}
              validationSchema={false}
              onClick={handleModalOpen}
            />
            <Stack direction="row" spacing={0.5}>
              <IconButton aria-label="Toggle theme" onClick={toggleTheme}>
                {theme.palette.mode === 'light' ? (
                  <DarkMode sx={{color: '#000', fontSize: 30}} />
                ) : (
                  <LightMode sx={{color: '#fff', fontSize: 30}} />
                )}
              </IconButton>
              <IconButton onClick={() => router.push('/cart')}>
                <Image
                  src="/icons/cart.svg"
                  alt="cart"
                  width={30}
                  height={24}
                  style={{
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(10)'
                        : 'brightness(1)',
                  }}
                />
              </IconButton>
              <IconButton
                onClick={e => setAnchorEl(e.currentTarget)}
                aria-describedby={'profile-popup'}
                sx={{
                  width: 43,
                  height: 43,
                }}
              >
                <Avatar src={data?.user?.image} alt="avatar" sx={styles.avatar}>
                  {(data?.user?.firstName ||
                    data?.user?.username ||
                    ' ')[0].toUpperCase()}
                </Avatar>
              </IconButton>
              <ProfilePopup
                anchorEl={anchorEl}
                handleOnClose={() => setAnchorEl(null)}
              />
            </Stack>
          </Stack>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={4}
          >
            <Link href="/auth/sign-in">
              <Button variant="outlined" sx={{width: '145px', height: '48px'}}>
                Sign In
              </Button>
            </Link>
            <SearchInput
              name="not-used-2"
              register={false}
              validationSchema={false}
              onClick={handleModalOpen}
            />
            <IconButton aria-label="Toggle theme" onClick={toggleTheme}>
              {theme.palette.mode === 'light' ? (
                <DarkMode sx={{color: '#000', fontSize: 30}} />
              ) : (
                <LightMode sx={{color: '#fff', fontSize: 30}} />
              )}
            </IconButton>
            <IconButton onClick={() => router.push('/cart')}>
              <Image
                src="/icons/cart.svg"
                alt="cart"
                width={26}
                height={26}
                style={{
                  filter:
                    theme.palette.mode === 'dark'
                      ? 'brightness(10)'
                      : 'brightness(1)',
                }}
              />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </>
  );
};

export default DesktopHeader;
