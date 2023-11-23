import Head from 'next/head';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Button, CircularProgress, Typography} from '@mui/material';
import Link from 'next/link';
import Input from '@/components/ui/Input/Input';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {styles} from '@/components/layouts/AuthLayout/authPagesStyles';
import {AuthLayout} from '@/components/layouts/AuthLayout/AuthLayout';
import {ReactElement} from 'react';

type ForgotPasswordType = {
  email: string;
};

const ForgotPassword = () => {
  const router = useRouter();
  const {mutate, isPending} = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: (userData: ForgotPasswordType) =>
      axios.post(`${process.env.API_URL}/auth/forgot-password`, userData),
    onSuccess: () => {
      toast.info('On your email was sent information about recovery');
      router.push('/auth/reset-password');
    },
    onError: () => {
      toast.error('Something went wrong, try again later');
    },
  });
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordType>();

  const onSubmit: SubmitHandler<ForgotPasswordType> = async data => {
    mutate(data);
  };

  return (
    <Box sx={styles.formBox}>
      {isPending && <CircularProgress sx={styles.loader} />}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
        <Box sx={{marginBottom: '24px'}}>
          <Input
            labelText="Email"
            register={register}
            name="email"
            validationSchema={{
              required: 'Entered value does not match email format',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            }}
            errorMessage={errors.email?.message}
          />
        </Box>

        <Button type="submit" variant="contained" disabled={isPending}>
          Reset password
        </Button>
      </Box>
      <Box sx={styles.fpLinksContainer}>
        <Link href={'/auth/reset-password'} style={styles.link}>
          <Typography>Go to reset password page</Typography>
        </Link>
        <Link href={'/auth/sign-in'} style={styles.link}>
          <Typography>Back to log in</Typography>
        </Link>
      </Box>
    </Box>
  );
};

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Forgot password</title>
        <meta
          name="description"
          content="Forgot your password? No worries. Follow the steps on this page to recover your account. We'll guide you through the process to regain access."
        />
      </Head>
      <AuthLayout
        title="Forgot password?"
        subtTitle="Don’t worry, we’ll send you reset instructions."
      >
        {page}
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
