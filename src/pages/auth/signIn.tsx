import {SubmitHandler, useForm} from 'react-hook-form';
import {signIn} from 'next-auth/react';
import {Box, Checkbox, FormControlLabel, Typography} from '@mui/material';
import Link from 'next/link';
import {CustomButton} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';

interface ISignIn {
  identifier: string;
  password: string;
  isRemember: boolean;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignIn>({
    defaultValues: {identifier: '', password: '', isRemember: false},
  });

  const onSubmit: SubmitHandler<ISignIn> = async data => {
    await signIn('credentials', {
      identifier: data.identifier,
      password: data.password,
      redirect: true,
      callbackUrl: 'http://localhost:3000',
    });
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{width: '960px', margin: '208px 286px 0 196px'}}>
        <Typography component="h2" sx={{fontSize: 45, marginBottom: 2}}>
          Welcom back
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
            name="identifier"
            validationSchema={{
              required: true,
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
              required: true,
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
                  {...register('isRemember', {})}
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
      <Image
        src="/images/signInBanner.png"
        alt="picture of our brand"
        width="960"
        height="1112"
      />
    </Box>
  );
}
