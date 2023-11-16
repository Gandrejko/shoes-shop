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

  const handleClose = () => {
    handleOnClose();
  };

  const logoutFunction = async () => {
    destroyCookie(null, 'rememberMe');
    await signOut();
  };

  return (
    <Popover
      id="profile-popup"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <List sx={styles.list}>
        <ListItem onClick={() => router.push('/my-products')}>
          <Typography variant="body1">My products</Typography>
        </ListItem>
        <Divider />
        <ListItem onClick={() => router.push('/settings')}>
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
