import {Input} from '@/components/Inputs/Input';
import {Box, Typography, Button} from '@mui/material';
import Link from 'next/link';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {styles} from '@/styles/authPagesStyles';
import {ReactElement} from 'react';
import {AuthLayot} from '@/components/AuthLayout/AuthLayout';

type SignUpType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const {mutateAsync} = useMutation({
    mutationFn: (userData: Partial<SignUpType>) =>
      axios.post(
        'https://shoes-shop-strapi.herokuapp.com/api/auth/local/register',
        userData,
      ),
    onSuccess: () => {
      toast.success('You are successfully sign up!');
      toast.info('The last step is to confirm your email');
      router.push('/auth/sign-in');
    },
    onError: e => {
      toast.error('Account with such login or email already exist');
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<SignUpType>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpType> = async data => {
    const {confirmPassword, ...restData} = data;
    mutateAsync(restData);
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={styles.formContainer}
      >
        <Box sx={styles.form}>
          <Input
            labelText="Name"
            register={register}
            name="username"
            validationSchema={{
              required: 'This field is required',
            }}
            errorMessage={errors.username?.message}
          />
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

        <Button type="submit" variant="contained">
          Sign up
        </Button>
      </Box>
      <Box sx={styles.linksContainer}>
        <Typography variant="body1">Already have an account?</Typography>
        <Link href={'/auth/sign-in'} style={styles.link}>
          <Typography>Log in</Typography>
        </Link>
      </Box>
    </Box>
  );
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayot
      title="Create an account"
      subtTitle="Create an account to get an easy access to your dream shopping"
    >
      {page}
    </AuthLayot>
  );
};

export default SignUp;
