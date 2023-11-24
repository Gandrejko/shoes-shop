import Head from 'next/head';
import {SubmitHandler, useForm} from 'react-hook-form';
import {SignInResponse, signIn} from 'next-auth/react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import Input from '@/components/ui/Input/Input';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {styles} from '@/components/layouts/AuthLayout/authPagesStyles';
import {ReactElement, useState} from 'react';
import {AuthLayout} from '@/components/layouts/AuthLayout/AuthLayout';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

type SignInType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {mutate} = useMutation({
    mutationFn: (userData: Partial<SignInType>) => {
      setIsLoading(true);
      return axios.post(`${process.env.API_URL}/auth/local`, {
        identifier: userData.email,
        password: userData.password,
      });
    },
    onSuccess: (_, userData) => {
      signIn('credentials', {
        identifier: userData.email,
        password: userData.password,
        redirect: false,
      })
        .then((value: SignInResponse | undefined) => {
          if (value?.ok) {
            localStorage.setItem('signInJustNow', JSON.stringify(true));
            router.push('/products');
          } else {
            toast.error('Something went wrong!');
          }
        })
        .finally(() => setIsLoading(false));
    },
    onError: (e: any) => {
      const errorMessage =
        e.response!.data.error.message.replace('identifier', 'email') ||
        'Wrong credentials';
      toast.error(errorMessage);
      setIsLoading(false);
    },
  });
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInType>({
    defaultValues: {email: '', password: '', rememberMe: false},
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInType> = async data => {
    mutate(data);
  };

  return (
    <Box sx={styles.formBox}>
      {isLoading && <CircularProgress sx={styles.loader} />}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={styles.formContainer}
      >
        <Box sx={styles.form}>
          <Input
            labelText="Email"
            register={register}
            name="email"
            validationSchema={{
              required: 'Entered value does not match email format',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
          <Box sx={styles.checkboxContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  {...register('rememberMe', {})}
                  sx={styles.checkbox}
                />
              }
              label={<Typography variant="body1">Remember me</Typography>}
            />
            <Link href="/auth/forgot-password" style={styles.link}>
              <Typography>Forgot password?</Typography>
            </Link>
          </Box>
        </Box>
        <Button type="submit" variant="contained" disabled={isLoading}>
          Sign in
        </Button>
      </Box>
      <Box sx={styles.linksContainer}>
        <Typography component="span">Don’t have an account?</Typography>
        <Link
          href={'/auth/sign-up'}
          style={styles.link}
          aria-label="Go to sign up page"
        >
          <Typography>Sign up</Typography>
        </Link>
      </Box>
    </Box>
  );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta
          name="description"
          content="Sign in to your account for a personalized experience. Access orders, manage preferences, and enjoy a seamless journey through our platform."
        />
      </Head>
      <AuthLayout
        title="Welcome back"
        subtTitle="Welcome back! Please enter your details to log into your account."
      >
        {page}
      </AuthLayout>
    </>
  );
};

export default SignIn;
