import Header from '@/components/Header';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import {Box, SxProps, Typography} from '@mui/material';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {ReactElement} from 'react';
import {toast} from 'react-toastify';
import {NextPageWithLayout} from './_app';
import UpdateForm from '@/components/UpdateProfile/UpdateForm';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

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
  avatar: any;
};

const styles: Record<string, SxProps> = {
  container: {
    display: 'flex',
    padding: {xs: 3, sm: 4, md: 6.5},
    margin: {xs: '0 auto', md: 0},
  },
  box: {flex: 5},
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

const SettingsPage: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const {data: session, update, status} = useSession();
  const token = session?.user.accessToken;
  const currentUser = session?.user;

  const {data, isLoading} = useQuery({
    queryKey: ['users', currentUser?.id],
    queryFn: async () => {
      if (status === 'loading') return null;

      const url = `${process.env.API_URL}/users/${currentUser?.id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          populate: 'avatar',
        },
      };
      const res = await axios.get(url, config);
      return res.data;
    },
  });

  const {mutate} = useMutation({
    mutationFn: async (userUpdateData: Partial<UserDataType>) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.putForm(
        `${process.env.API_URL}/users/${currentUser?.id}`,
        // {...userUpdateData, avatar: userUpdateData.avatar?.id ?? null},
        {data: JSON.stringify(userUpdateData)},
        config,
      );
      return res.data;
    },
    onSuccess: newData => {
      queryClient.invalidateQueries({queryKey: ['users', currentUser?.id]});
      update(newData);
      toast.success('Your profile was successfully updated!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <div>Loading</div>;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.box}>
        <Typography component="h1" sx={styles.h1}>
          My Profile
        </Typography>
        <UpdateForm onSubmit={mutate} data={data} />
      </Box>
    </Box>
  );
};

SettingsPage.getLayout = function (page: ReactElement) {
  return (
    <>
      <Header />
      <SidebarLayout currentTab="settings">{page}</SidebarLayout>;
    </>
  );
};

export default SettingsPage;
