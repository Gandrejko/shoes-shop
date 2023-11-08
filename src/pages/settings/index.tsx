import {ReactElement, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {NextPageWithLayout} from '../_app';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import UpdateProfileHeader from '@/components/UpdatePofileHeader/UpdateProfileHeader';
import UpdateProfileForm from '@/components/Forms/UpdateProfileForm';
import {useQuery, useQueryClient} from 'react-query';
import axios from 'axios';

const currentUser = {
  id: 395,
  username: 'Nas',
  email: 'nas@gmail.com',
  provider: 'local',
  confirmed: true,
  blocked: false,
  createdAt: '2023-11-04T21:40:04.384Z',
  updatedAt: '2023-11-07T11:05:24.437Z',
  phoneNumber: '1312313',
  firstName: 'Nas',
  lastName: 'Nas',
};

type UserDataType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
};

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
  const [imageId, setImageId] = useState(-1);

  return (
    <Box sx={styles.box}>
      <Box>
        <Typography component="h1" sx={styles.h1}>
          My Profile
        </Typography>
        <UpdateProfileHeader setImageId={setImageId} />
        <Typography component="p" sx={styles.paragraph}>
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <UpdateProfileForm imageId={imageId} />
      </Box>
    </Box>
  );
};

ProfilePage.getLayout = function (page: ReactElement) {
  return <SidebarLayout currentTab="settings">{page}</SidebarLayout>;
};

export default ProfilePage;
