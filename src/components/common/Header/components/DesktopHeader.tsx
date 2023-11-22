import {
  IconButton,
  Stack,
  SxProps,
  Toolbar,
  Typography,
  Button,
  Link as MuiLink,
  Avatar,
} from '@mui/material';
import SearchInput from '@/components/common/SearchInput/SearchInput';
import {HeaderProps} from '../Header';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {ProfilePopup} from './ProfilePopup';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';

const styles: Record<string, SxProps> = {
  desktopWrapper: {
    height: '120px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: 'primary.main',
    },
  },
  avatar: {
    backgroundColor: 'primary.main',
    width: 24,
    height: 24,
  },
};

const DesktopHeader = ({userLoggedIn, handleModalOpen}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();
  const {data} = useSession();

  return (
    <>
      <Toolbar sx={styles.desktopWrapper}>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Link href="/products">
            <Image src="/icons/logo.svg" alt="logo" width={40} height={30} />
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
              <IconButton onClick={() => router.push('/cart')}>
                <Image
                  src="/icons/cart.svg"
                  alt="cart"
                  width={24}
                  height={24}
                />
              </IconButton>
              <IconButton
                onClick={e => setAnchorEl(e.currentTarget)}
                aria-describedby={'profile-popup'}
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
            <IconButton onClick={() => router.push('/cart')}>
              <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </>
  );
};

export default DesktopHeader;
