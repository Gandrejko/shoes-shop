import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  SxProps,
  Typography,
  useTheme,
} from '@mui/material';
import {signOut, useSession} from 'next-auth/react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {destroyCookie} from 'nookies';

const styles: Record<string, SxProps> = {
  container: {
    paddingLeft: 4,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    paddingY: '35px',
    gap: '16px',
  },
  avatarContainer: {
    width: '64px',
    height: '64px',
    border: '1px solid #fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  avatar: {
    width: 1,
    height: 1,
    bgcolor: 'primary.main',
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
    padding: 0,
    cursor: 'pointer',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: 'primary.main',
    },
  },
};

type SidebarProps = {
  currentTab?: 'products' | 'settings' | 'logout';
  closeDrawer?: () => void;
};

const Sidebar = ({currentTab, closeDrawer}: SidebarProps) => {
  const theme = useTheme();
  const router = useRouter();
  const {data} = useSession();
  const image = data?.user.image;
  const firstName = data?.user.firstName;
  const lastName = data?.user.lastName;
  const username = data?.user.username;

  const logoutFunction = async () => {
    destroyCookie(null, 'rememberMe');
    await signOut();
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.user}>
        <Box sx={styles.avatarContainer}>
          {image ? (
            <Image
              src={image}
              alt={(firstName || username || ' ')[0].toUpperCase()}
              fill
              sizes="100%"
              style={{objectFit: 'cover'}}
            />
          ) : (
            <Avatar
              src="/"
              alt={(firstName || username || ' ')[0].toUpperCase()}
              sx={styles.avatar}
            />
          )}
        </Box>
        <Box>
          <Typography variant="body2" sx={styles.welcome}>
            Welcome
          </Typography>
          {firstName && lastName && (
            <Typography>
              <Typography component="span">{firstName}</Typography>{' '}
              <Typography component="span">{lastName}</Typography>
            </Typography>
          )}
          {!(firstName && lastName) && <Typography>{username}</Typography>}
        </Box>
      </Box>
      <Divider />
      <List sx={styles.tabs}>
        <ListItem
          sx={{
            ...styles.tab,
            color: currentTab === 'products' ? 'primary.main' : 'text.primary',
          }}
          onClick={() => {
            router.push('/products/me');
            if (closeDrawer) {
              closeDrawer();
            }
          }}
        >
          <Image
            width={20}
            height={20}
            src="/icons/myProducts.svg"
            alt="my-products"
            style={{
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(10)'
                  : 'brightness(1)',
            }}
          />
          <Typography>My products</Typography>
        </ListItem>
        <ListItem
          sx={{
            ...styles.tab,
            color: currentTab === 'settings' ? 'primary.main' : 'text.primary',
          }}
          onClick={() => {
            router.push('/settings');
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
            style={{
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(10)'
                  : 'brightness(1)',
            }}
          />
          <Typography>Settings</Typography>
        </ListItem>
        <ListItem
          sx={{
            ...styles.tab,
            color: currentTab === 'logout' ? 'primary.main' : 'text.primary',
          }}
          onClick={logoutFunction}
        >
          <Image
            width={20}
            height={20}
            src="/icons/logout.svg"
            alt="logout"
            style={{
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(10)'
                  : 'brightness(1)',
            }}
          />
          <Typography>Log out</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
