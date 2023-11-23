import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import {SidebarLayout} from '@/components/layouts/SidebarLayout/SidebarLayout';
import UpdateForm from '@/components/common/UpdateProfile/UpdateForm';
import {usePut} from '@/hooks';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {UserRequest, UserResponse} from '@/types';
import {Box, SxProps, Typography} from '@mui/material';
import axios from 'axios';
import {GetServerSidePropsContext} from 'next';
import {getServerSession} from 'next-auth';
import {useSession} from 'next-auth/react';
import Head from 'next/head';
import React, {ReactElement} from 'react';
import {toast} from 'react-toastify';

const styles: Record<string, SxProps> = {
  container: {
    padding: 3,
    margin: {xs: '0 auto', md: 0},
    display: 'flex',
    alignItems: 'center',
    flexDirection: {xs: 'column', md: 'row'},
  },
  box: {flex: 5},
  header: {
    marginBottom: {xs: '12px', sm: 2},
  },
};

type SettingsPageProps = {
  user: UserResponse;
};
const SettingsPage = ({user}: SettingsPageProps) => {
  const {data: session, update} = useSession();
  const sessionUser = session?.user;

  const {mutate, isPending} = usePut<UserRequest, UserResponse>(
    `/users/${sessionUser?.id}`,
    {
      onSuccess: (responseData, requestData) => {
        update({
          user: {
            ...responseData,
            image: requestData.avatar?.url,
          },
        });
        toast.success('Your profile was successfully updated!');
      },
      onError: error => {
        toast.error(error.message);
      },
    },
  );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.box}>
        <Typography variant="h1" sx={styles.header}>
          My Profile
        </Typography>
        <UpdateForm
          onSubmit={mutate}
          userData={user!}
          isUserDataLoading={isPending}
        />
      </Box>
    </Box>
  );
};

SettingsPage.getLayout = function (page: ReactElement) {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta
          name="description"
          content="Personalize your experience with our settings page. Tailor preferences, update information, and make your visit uniquely yours."
        />
      </Head>
      <HeaderLayout>
        <SidebarLayout currentTab="settings">{page}</SidebarLayout>
      </HeaderLayout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions,
    );
    const {data: user} = await axios.get<UserResponse>(
      `${process.env.API_URL}/users/${session?.user.id}`,
      {
        params: {
          populate: '*',
        },
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );

    return {props: {user}};
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }
}

export default SettingsPage;
