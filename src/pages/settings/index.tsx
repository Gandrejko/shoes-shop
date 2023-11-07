import {ReactElement} from 'react';
import {Box, Typography} from '@mui/material';
import {NextPageWithLayout} from '../_app';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import UpdateProfileHeader from '@/components/UpdatePofileHeader/UpdateProfileHeader';
import UpdateProfileForm from '@/components/Forms/UpdateProfileForm';

const styles = {
  box: {
    display: 'flex',
    padding: 6.5,
    flex: 5,
  },
  h1: {
    fontWeight: 500,
    fontSize: 45,
    marginBottom: 4.5,
  },
  paragraph: {
    fontSize: 15,
    fontWeight: 300,
    marginBottom: 6,
    color: '#5C5C5C',
  },
};

const ProfilePage: NextPageWithLayout = () => {
  return (
    <Box sx={styles.box}>
      <Box>
        <Typography component="h1" sx={styles.h1}>
          My Profile
        </Typography>
        <UpdateProfileHeader />
        <Typography component="p" sx={styles.paragraph}>
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <UpdateProfileForm />
      </Box>
    </Box>
  );
};

ProfilePage.getLayout = function (page: ReactElement) {
  return <SidebarLayout currentTab="settings">{page}</SidebarLayout>;
};

export default ProfilePage;
