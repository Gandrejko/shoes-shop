import {ReactNode} from 'react';
import Image from 'next/image';
import {Box, Divider, List, ListItem, SxProps, Typography} from '@mui/material';

const styles: Record<string, SxProps> = {
  layout: {
    display: 'flex',
  },
  sidebar: {
    width: 320,
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
  },
};

type SidebarLayoutProps = {
  children: ReactNode;
  currentTab?: 'products' | 'settings' | 'logout';
};

export const SidebarLayout = ({children, currentTab}: SidebarLayoutProps) => {
  const image = false;
  const name = 'Jane Meldrum';
  return (
    <Box sx={styles.layout}>
      <Box sx={styles.sidebar}>
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
              color: currentTab === 'products' ? 'FE645E' : '#000',
            }}
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
              color: currentTab === 'settings' ? 'FE645E' : '#000',
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
              color: currentTab === 'logout' ? 'FE645E' : '#000',
            }}
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
      {children}
    </Box>
  );
};
