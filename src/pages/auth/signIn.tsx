import {SubmitHandler, useForm} from 'react-hook-form';
import {SignInResponse, signIn, useSession} from 'next-auth/react';
import {Box, Checkbox, FormControlLabel, Typography} from '@mui/material';
import Link from 'next/link';
import {CustomButton} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

interface SignInType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInType>({
    defaultValues: {email: '', password: '', rememberMe: false},
  });
  const router = useRouter();
  const {data: session} = useSession();

  const onSubmit: SubmitHandler<SignInType> = async data => {
    signIn('credentials', {
      identifier: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      redirect: false,
    }).then((value: SignInResponse | undefined) => {
      if (value?.ok) {
        toast.success(`Hello, ${session?.user.username}!`);
        router.push('/');
      } else {
        toast.error('Wrong credentials!');
      }
    });
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{flex: '1', margin: '208px 286px 0 196px'}}>
        <Typography component="h1" sx={{marginBottom: 2}}>
          Welcome back
        </Typography>
        <Typography component="h5" sx={{fontSize: 15, marginBottom: 6}}>
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{display: 'flex', flexDirection: 'column'}}
        >
          <Input
            labelText="Email"
            register={register}
            name="email"
            validationSchema={{
              required: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            }}
            required={true}
            style={{marginBottom: '24px'}}
          />
          <Input
            labelText="Password"
            register={register}
            name="password"
            validationSchema={{
              required: 'This field is required',
              minLength: {
                value: 6,
                message: 'min length is 6',
              },
            }}
            required={true}
            type="password"
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              marginBottom: '56px',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...register('rememberMe', {})}
                  sx={{'& .MuiSvgIcon-root': {fontSize: '16px'}}}
                />
              }
              label={
                <Typography sx={{fontSize: '15px'}}>Remember me</Typography>
              }
            />
            <Link href="/auth/forgotPassword">
              <Typography sx={{color: 'red'}}>Forgot password?</Typography>
            </Link>
          </Box>

          <CustomButton type="submit">Sign in</CustomButton>
        </Box>
        <Box
          sx={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}
        >
          <Typography component="span">Don’t have an account?</Typography>
          <Link href={'/auth/signUp'}>
            <Typography sx={{marginLeft: '5px', color: 'red'}}>
              Sign up
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box sx={{width: '943px', height: '930px', position: 'relative'}}>
        <Image
          src="/images/signInBanner.png"
          alt="picture of our brand"
          fill={true}
        />
      </Box>
    </Box>
  );
}
