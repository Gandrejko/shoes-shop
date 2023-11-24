import ColorModeContext from '@/config/theme/ColorModeContext';
import {Divider, List, ListItem, Popover, Typography} from '@mui/material';
import {signOut} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {destroyCookie} from 'nookies';
import {useContext} from 'react';

const styles = {
  list: {
    a: {
      textDecoration: 'none',
      color: 'text.secondary',
    },
    li: {
      cursor: 'pointer',
      '&:hover': {
        color: 'primary.main',
      },
    },
  },
};

type ProfilePopupProps = {
  anchorEl: HTMLButtonElement | null;
  handleOnClose: () => void;
};

export const ProfilePopup = ({anchorEl, handleOnClose}: ProfilePopupProps) => {
  const {theme} = useContext(ColorModeContext);
  const unidqId = 1192; //uniqId for tabIndex

  const logoutFunction = async () => {
    destroyCookie(null, 'rememberMe');
    await signOut();
  };

  const onRedirectHandler = () => {
    handleOnClose();
  };

  return (
    <Popover
      id="profile-popup"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => handleOnClose()}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <List sx={styles.list}>
        <Link href="/products/me" onClick={onRedirectHandler}>
          <ListItem>
            <Image
              width={20}
              height={20}
              src="/icons/myProducts.svg"
              alt="my-products"
              style={{
                marginRight: 10,
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(10)'
                    : 'brightness(1)',
              }}
            />
            <Typography variant="body1">My products</Typography>
          </ListItem>
        </Link>
        <Divider />
        <Link href="/settings" onClick={onRedirectHandler}>
          <ListItem>
            <Image
              width={20}
              height={20}
              src="/icons/settings.svg"
              alt="settings"
              style={{
                marginRight: 10,
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(10)'
                    : 'brightness(1)',
              }}
            />
            <Typography variant="body1">Settings</Typography>
          </ListItem>
        </Link>
        <Divider />
        <ListItem onClick={logoutFunction} tabIndex={unidqId}>
          <Image
            width={20}
            height={20}
            src="/icons/logout.svg"
            alt="logout"
            style={{
              marginRight: 10,
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(10)'
                  : 'brightness(1)',
            }}
          />
          <Typography variant="body1">Log out</Typography>
        </ListItem>
      </List>
    </Popover>
  );
};
