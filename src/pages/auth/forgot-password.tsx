import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Button, Typography} from '@mui/material';
import Link from 'next/link';
import {Input} from '@/components/Inputs/Input';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {styles} from '@/styles/authPagesStyles';
import {AuthLayot} from '@/components/AuthLayout/AuthLayout';
import {ReactElement} from 'react';

type ForgotPasswordType = {
  email: string;
};

const ForgotPassword = () => {
  const router = useRouter();
  const {mutate} = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: (userData: ForgotPasswordType) =>
      axios.post(
        'https://shoes-shop-strapi.herokuapp.com/api/auth/forgot-password',
        userData,
      ),
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
    <Box>
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

        <Button type="submit" variant="contained">
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
    <AuthLayot
      title="Forgot password?"
      subtTitle="Don’t worry, we’ll send you reset instructions."
    >
      {page}
    </AuthLayot>
  );
};

export default ForgotPassword;
