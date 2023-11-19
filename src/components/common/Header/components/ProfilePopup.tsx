import {Divider, List, ListItem, Popover, Typography} from '@mui/material';
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {destroyCookie} from 'nookies';

const styles = {
  list: {
    li: {
      '&:hover': {
        cursor: 'pointer',
        color: '#FE645E',
      },
    },
  },
};

type ProfilePopupProps = {
  anchorEl: HTMLButtonElement | null;
  handleOnClose: () => void;
};

export const ProfilePopup = ({anchorEl, handleOnClose}: ProfilePopupProps) => {
  const router = useRouter();

  const logoutFunction = async () => {
    destroyCookie(null, 'rememberMe');
    await signOut();
  };

  const onRedirectHandler = (url: string) => {
    handleOnClose();
    router.push(url);
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
        <ListItem onClick={() => onRedirectHandler('/products/me')}>
          <Typography variant="body1">My products</Typography>
        </ListItem>
        <Divider />
        <ListItem onClick={() => onRedirectHandler('/settings')}>
          <Typography variant="body1">My Settings</Typography>
        </ListItem>
        <Divider />
        <ListItem onClick={logoutFunction}>
          <Typography variant="body1">Log out</Typography>
        </ListItem>
      </List>
    </Popover>
  );
};
