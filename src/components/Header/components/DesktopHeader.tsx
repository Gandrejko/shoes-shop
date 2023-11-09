import {IconButton, Stack, SxProps, Toolbar, Typography, Button} from '@mui/material';
import {SearchInput} from '@/components/Inputs/SearchInput';
import {HeaderProps} from '@/components/Header';
import Image from 'next/image';

const styles: Record<string, SxProps> = {
  desktopWrapper: {
    height: '120px',
    display: 'flex',
    justifyContent: 'space-between',
  }
}

const DesktopHeader = ({userLoggedIn}: HeaderProps) => {
  return (
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
            <Button sx={{width:'145px', height:'48px'}} variant='contained'>
              Sign In
            </Button>
            <SearchInput register={() => {}} validationSchema=""/>
            <IconButton onClick={() => {}}>
              <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
  )
};

export default DesktopHeader;
