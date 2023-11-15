import {Box, Divider, List, ListItem, SxProps, Typography} from '@mui/material';
import Image from 'next/image';
import {destroyCookie} from 'nookies';
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';

const styles: Record<string, SxProps> = {
  user: {
    display: 'flex',
    alignItems: 'center',
    padding: '35px 16px',
    gap: '16px',
  },
  avatarContainer: {
    width: '64px',
    height: '64px',
    backgroundColor: 'primary.main',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#fff',
  },
  welcome: {
    color: 'grey.A200',
  },
  tabs: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
  },
  tab: {
    display: 'flex',
    gap: '15px',
    listStyle: 'none',
    padding: '0 16px',
    cursor: 'pointer',
  },
};

type SidebarProps = {
  currentTab?: 'products' | 'settings' | 'logout';
  closeDrawer?: () => void;
};

const Sidebar = ({currentTab, closeDrawer}: SidebarProps) => {
  const router = useRouter();
  const image = false;
  const name = 'Jane Meldrum';

  const logoutFunction = async () => {
    destroyCookie(null, 'rememberMe');
    await signOut();
  };

  return (
    <Box >
      <Box sx={styles.user}>
        <Box sx={styles.avatarContainer}>
          {image && <Image src={image} width={64} height={64} alt="user" />}
          {!image && (
            <Typography variant="h2" sx={styles.avatarLetter}>
              {name[0].toUpperCase()}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography variant="body2" sx={styles.welcome}>
            Welcome
          </Typography>
          <Typography>{name}</Typography>
        </Box>
      </Box>
      <Divider />
      <List sx={styles.tabs}>
        <ListItem
          sx={{
            ...styles.tab,
            color: currentTab === 'products' ? '#FE645E' : '#000',
          }}
          onClick={() => {
            router.push('/my-products')
            if (closeDrawer) {
              closeDrawer();
          }}}
        >
          <Image
            width={20}
            height={20}
            src="/icons/myProducts.svg"
            alt="my-products"
          />
          <Typography>My products</Typography>
        </ListItem>
        <ListItem
          sx={{
            ...styles.tab,
            color: currentTab === 'settings' ? '#FE645E' : '#000',
          }}
          onClick={() => {
            router.push('/settings')
            if (closeDrawer) {
              closeDrawer();
            }
          }}
        >
          <Image
            width={20}
            height={20}
            src="/icons/settings.svg"
            alt="settings"
          />
          <Typography>Settings</Typography>
        </ListItem>
        <ListItem
          sx={{
            ...styles.tab,
            color: currentTab === 'logout' ? '#FE645E' : '#000',
          }}
          onClick={logoutFunction}
        >
          <Image width={20} height={20} src="/icons/logout.svg" alt="logout" />
          <Typography>Log out</Typography>
        </ListItem>
      </List>
    </Box >
  );
};

export default Sidebar;
