import {useRouter} from 'next/navigation';
import {ReactNode} from 'react';
import Image from 'next/image';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  SxProps,
  Typography,
} from '@mui/material';
import {destroyCookie} from 'nookies';
import {signOut, useSession} from 'next-auth/react';
import Header from '../Header';

const styles: Record<string, SxProps> = {
  layout: {
    display: 'flex',
    height: '100%',
  },
  sidebar: {
    width: 320,
    height: '100%',
    flexShrink: 0,
    display: {md: 'block', xs: 'none'},
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    padding: '35px 16px',
    gap: '16px',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'primary.main',
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
  },
  children: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'visible',
  },
};

type SidebarLayoutProps = {
  children: ReactNode;
  currentTab?: 'products' | 'settings' | 'logout';
};

export const SidebarLayout = ({children, currentTab}: SidebarLayoutProps) => {
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
    <Box sx={styles.layout}>
      <Box sx={styles.sidebar}>
        <Box sx={styles.user}>
          <Avatar src={image} sx={styles.avatarContainer}>
            {(firstName || username || ' ')[0].toUpperCase()}
          </Avatar>
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
              color: currentTab === 'products' ? '#FE645E' : '#000',
            }}
            onClick={() => router.push('/my-products')}
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
            <Image
              width={20}
              height={20}
              src="/icons/logout.svg"
              alt="logout"
            />
            <Typography>Log out</Typography>
          </ListItem>
        </List>
      </Box>
      <Box sx={styles.children}>{children}</Box>
    </Box>
  );
};
