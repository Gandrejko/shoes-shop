import Head from 'next/head';
import {useRouter, useSearchParams} from 'next/navigation';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Button, CircularProgress, Typography} from '@mui/material';
import Link from 'next/link';
import Input from '@/components/ui/Input/Input';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {styles} from '@/components/layouts/AuthLayout/authPagesStyles';
import {ReactElement} from 'react';
import {AuthLayout} from '@/components/layouts/AuthLayout/AuthLayout';

type ResetPasswordType = {
  password: string;
  confirmPassword: string;
  code: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const {mutate, isPending} = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (userData: ResetPasswordType) =>
      axios.post(`${process.env.API_URL}/auth/reset-password`, {
        password: userData.password,
        passwordConfirmation: userData.confirmPassword,
        code: userData.code,
      }),
    onSuccess: value => {
      toast.success('Password was changed!');
      router.push('/auth/sign-in');
    },
    onError: e => {
      toast.error('Something went wrong, try again later');
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Omit<ResetPasswordType, 'code'>>();

  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';

  const onSubmit: SubmitHandler<
    Omit<ResetPasswordType, 'code'>
  > = async data => {
    if (!code) {
      toast.info('You need to add code from your email');
      return;
    }
    mutate({...data, code});
  };

  return (
    <Box sx={styles.formBox}>
      {isPending && <CircularProgress sx={styles.loader} />}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={styles.formContainer}
      >
        <Box sx={styles.form}>
          <Input
            labelText="Password"
            register={register}
            name="password"
            validationSchema={{
              required: 'Min length is 8',
              minLength: {
                value: 8,
                message: 'Min length is 8',
              },
            }}
            type="password"
            errorMessage={errors.password?.message}
          />
          <Input
            labelText="Confirm password"
            register={register}
            name="confirmPassword"
            validationSchema={{
              required: 'Your passwords do no match',
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Your passwords do no match';
                }
              },
            }}
            type="password"
            errorMessage={errors.confirmPassword?.message}
          />
        </Box>

        <Button type="submit" variant="contained" disabled={isPending}>
          Reset password
        </Button>
      </Box>
      <Box sx={styles.linksContainer}>
        <Link
          href={'/auth/sign-in'}
          style={styles.link}
          aria-label="Go to sig-in page"
        >
          <Typography>Back to log in</Typography>
        </Link>
      </Box>
    </Box>
  );
};

ResetPassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>
      <AuthLayout
        title="Reset password"
        subtTitle="Please create new password here"
      >
        {page}
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
