import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import UpdateForm from '@/components/UpdateProfile/UpdateForm';
import {Box, SxProps, Typography} from '@mui/material';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {ReactElement} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {toast} from 'react-toastify';
import {NextPageWithLayout} from './_app';

const styles: Record<string, SxProps> = {
  container: {
    display: 'flex',
    padding: {xs: 3, sm: 4, md: 6.5},
    margin: {xs: '0 auto', md: 0},
  },
  box: {flex: 5},
  header: {
    marginBottom: {xs: '12px', sm: 4.5},
  },
};

export type UserDataType = {
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

export type UpdateFormType = {
  formProps: Pick<
    UseFormReturn<Partial<UserDataType>>,
    'register' | 'control' | 'getValues' | 'setValue' | 'formState'
  >;
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
        {...userUpdateData, avatar: userUpdateData.avatar?.id ?? null},
        config,
      );
      return res.data;
    },
    onSuccess: newData => {
      queryClient.invalidateQueries({queryKey: ['users', currentUser?.id]});
      update({
        ...session,
        user: {
          ...session?.user,
          firstName: newData.firstName,
          lastName: newData.lastName,
        },
      });
      toast.success('Your profile was successfully updated!');
    },
    onError: error => {
      toast.error('Something went wrong. Please, try again!');
    },
  });

  if (isLoading) return <div>Loading</div>;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.box}>
        <Typography variant="h1" sx={styles.header}>
          My Profile
        </Typography>
        <UpdateForm onSubmit={mutate} userData={data} />
      </Box>
    </Box>
  );
};

SettingsPage.getLayout = function (page: ReactElement) {
  return (
    <HeaderLayout>
      <SidebarLayout currentTab="settings">{page}</SidebarLayout>
    </HeaderLayout>
  );
};

export default SettingsPage;
