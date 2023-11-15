import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import UpdateForm from '@/components/UpdateProfile/UpdateForm';
import useGet from '@/hooks/useGet';
import usePut from '@/hooks/usePut';
import {UserRequest, UserResponse} from '@/types/user';
import {Box, SxProps, Typography} from '@mui/material';
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
    UseFormReturn<UserRequest>,
    'register' | 'control' | 'getValues' | 'setValue' | 'formState'
  >;
};

const SettingsPage: NextPageWithLayout = () => {
  const {data: session, update} = useSession();
  const sessionUser = session?.user;

  const {data: userData, isLoading} = useGet<UserResponse>(
    `/users/${sessionUser?.id}`,
    {enabled: Boolean(sessionUser)},
    {populate: 'avatar'},
  );

  console.log(sessionUser);

  const {mutate} = usePut<UserRequest, UserResponse>(
    `/users/${sessionUser?.id}`,
    {
      onSuccess: newData => {
        update({
          user: {
            ...newData,
            image: userData?.avatar,
          },
        });
        toast.success('Your profile was successfully updated!');
      },
      onError: error => {
        toast.error(error.message);
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
        <UpdateForm onSubmit={mutate} userData={userData!} />
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
