import {SubmitHandler, useForm} from 'react-hook-form';
import {SignInResponse, signIn} from 'next-auth/react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';
import {Input} from '@/components/Inputs/Input';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {styles} from '../../styles/authPagesStyles';
import {ReactElement} from 'react';
import {AuthLayot} from '@/components/AuthLayout/AuthLayout';

interface SignInType {
  email: string;
  password: string;
  rememberMe: boolean;
}
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInType>({
    defaultValues: {email: '', password: '', rememberMe: false},
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInType> = async data => {
    signIn('credentials', {
      identifier: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      redirect: false,
    }).then((value: SignInResponse | undefined) => {
      if (value?.ok) {
        localStorage.setItem('signInJustNow', JSON.stringify(true));
        router.push('/');
      } else {
        toast.error('Wrong credentials!');
      }
    });
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
        <Button type="submit" variant="contained">
          Sign in
        </Button>
      </Box>
      <Box sx={styles.linksContainer}>
        <Typography component="span">Don’t have an account?</Typography>
        <Link href={'/auth/sign-up'} style={styles.link}>
          <Typography>Sign up</Typography>
        </Link>
      </Box>
    </Box>
  );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayot
      title="Welcome back"
      subtTitle="Welcome back! Please enter your details to log into your account."
    >
      {page}
    </AuthLayot>
  );
};

export default SignIn;
