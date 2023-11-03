import {CustomButton} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import {Box, Typography} from '@mui/material';
import Link from 'next/link';
import {SubmitHandler, useForm} from 'react-hook-form';
import Image from 'next/image';
import {log} from 'console';

interface ISignUp {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<ISignUp>();

  const onSubmit: SubmitHandler<ISignUp> = async data => {
    const {confirmPassword, ...restData} = data;
    const res = await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/auth/local/register',
      {
        method: 'POST',
        body: JSON.stringify(restData),
        headers: {'Content-Type': 'application/json'},
      },
    );
    const user = await res.json();
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{width: '960px', margin: '208px 286px 0 196px'}}>
        <Typography component="h2" sx={{fontSize: 45, marginBottom: 2}}>
          Create an account
        </Typography>
        <Typography component="h5" sx={{fontSize: 15, marginBottom: 6}}>
          Create an account to get an easy access to your dream shopping
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{display: 'flex', flexDirection: 'column'}}
        >
          <Input
            labelText="Name"
            register={register}
            name="username"
            validationSchema={{
              required: true,
              pattern: {
                message: 'Required field',
              },
            }}
            required={true}
            style={{marginBottom: '24px'}}
          />
          <Input
            labelText="Email"
            register={register}
            name="email"
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
            style={{marginBottom: '24px'}}
          />
          <Input
            labelText="Confirm password"
            register={register}
            name="confirmPassword"
            validationSchema={{
              required: true,
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Your passwords do no match';
                }
              },
            }}
            required={true}
            type="password"
            style={{marginBottom: '104px'}}
          />

          <CustomButton type="submit">Sign up</CustomButton>
        </Box>
        <Box
          sx={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}
        >
          <Typography component="span">Already have an account?</Typography>
          <Link href={'/auth/signIn'}>
            <Typography sx={{marginLeft: '5px', color: 'red'}}>
              Log in
            </Typography>
          </Link>
        </Box>
      </Box>
      <Image
        src="/images/signUpBanner.png"
        alt="picture of our brand"
        width="960"
        height="1112"
      />
    </Box>
  );
}
