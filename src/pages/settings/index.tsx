import UpdateProfileForm from '@/components/Forms/UpdateProfileForm';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import UpdateProfileHeader from '@/components/UpdatePofileHeader/UpdateProfileHeader';
import {Box, SxProps, Typography} from '@mui/material';
import {ReactElement, useState} from 'react';
import {NextPageWithLayout} from '../_app';
import Header from '@/components/Header';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {useQuery} from '@tanstack/react-query';

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

const styles: Record<string, SxProps> = {
  box: {
    display: 'flex',
    padding: {xs: 3, sm: 4, md: 6.5},
    flex: 5,
  },
  h1: {
    fontSize: {xs: 30, sm: 45},
    marginBottom: {xs: '12px', sm: 4.5},
  },
  paragraph: {
    fontSize: {xs: 12, sm: 15},
    fontWeight: 300,
    marginBottom: {xs: 3, sm: 6},
    color: '#5c5c5c',
  },
};

const ProfilePage: NextPageWithLayout = () => {
  // const {data} = useSession();
  const data = {user: {id: 395}};
  const jwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk1LCJpYXQiOjE2OTkzNzU4OTQsImV4cCI6MTcwMTk2Nzg5NH0.Toa8YhgAK-KC1FWVmbwLLTUrRpsZHdOZ7_fvTl_Mei0';

  const [image, setImage] = useState<any>(null);

  const {data: currentUser, isLoading} = useQuery({
    queryKey: ['users', data?.user.id],
    queryFn: async () => {
      const url = `https://shoes-shop-strapi.herokuapp.com/api/users/${data?.user.id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          populate: 'avatar',
        },
      };
      const res = await axios.get(url, config);
      if (res.data.avatar) setImage(res.data.avatar);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={styles.box}>
      <Box>
        <Typography component="h1" sx={styles.h1}>
          My Profile
        </Typography>
        <UpdateProfileHeader
          currentUser={currentUser}
          image={image}
          setImage={setImage}
        />
        <Typography component="p" sx={styles.paragraph}>
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <UpdateProfileForm currentUser={currentUser} image={image} />
      </Box>
    </Box>
  );
};

ProfilePage.getLayout = function (page: ReactElement) {
  return (
    <>
      <Header />
      <SidebarLayout currentTab="settings">{page}</SidebarLayout>;
    </>
  );
};

export default ProfilePage;
