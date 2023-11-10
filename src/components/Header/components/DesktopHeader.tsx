import {
  IconButton,
  Stack,
  SxProps,
  Toolbar,
  Typography,
} from '@mui/material';
import {SearchInput} from '@/components/Inputs/SearchInput';
import {HeaderProps} from '@/components/Header';
import {Button} from '@/components/Button/Button';
import Image from 'next/image';

const styles: Record<string, SxProps> = {
  desktopWrapper: {
    height: '120px',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const DesktopHeader = ({userLoggedIn, handleModalOpen}: HeaderProps) => {
  return (
    <>
      <Toolbar sx={styles.desktopWrapper}>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Image src="/icons/logo.svg" alt="logo" width={40} height={30} />
          <Typography variant="body1">Products</Typography>
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
              <IconButton onClick={() => {}}>
                <Image
                  src="/icons/cart.svg"
                  alt="cart"
                  width={24}
                  height={24}
                />
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
            <Button isTransparent width="145px" height="48px">Sign In</Button>
            <SearchInput
              name="not-used-2"
              register={false}
              validationSchema={false}
              onClick={handleModalOpen}
            />
            <IconButton onClick={() => {}}>
              <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </>
  );
};

export default DesktopHeader;
