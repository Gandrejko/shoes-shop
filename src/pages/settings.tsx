import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import UpdateForm from '@/components/UpdateProfile/UpdateForm';
import useGet from '@/hooks/useGet';
import usePut from '@/hooks/usePut';
import {UserRequest, UserResponse} from '@/types/user';
import {Box, SxProps, Typography} from '@mui/material';
import {useQueryClient} from '@tanstack/react-query';
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

export type UpdateFormType = {
  formProps: Pick<
    UseFormReturn<UserResponse>,
    'register' | 'control' | 'getValues' | 'setValue' | 'formState'
  >;
};

const SettingsPage: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const {data: session, update} = useSession();
  const token = session?.user.accessToken;
  const currentUser = session?.user;

  console.log(session);

  const {data, isLoading} = useGet<UserResponse>(
    `/users/${currentUser?.id}`,
    {enabled: Boolean(currentUser)},
    {
      populate: 'avatar',
    },
  );

  const {mutate} = usePut<UserRequest, UserResponse>(
    `/users/${currentUser?.id}`,
    {
      onSuccess: newData => {
        queryClient.invalidateQueries({queryKey: ['users', currentUser?.id]});
        update(newData);
        toast.success('Your profile was successfully updated!');
      },
      onError: error => {
        toast.error('Something went wrong. Please, try again!');
      },
    },
  );

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
