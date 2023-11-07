import {CustomButton} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import {Box, Typography} from '@mui/material';
import Link from 'next/link';
import {SubmitHandler, useForm} from 'react-hook-form';
import Image from 'next/image';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

type SignUpType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
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
    <Box sx={{display: 'flex'}}>
      <Box sx={{flex: '1', margin: '208px 286px 0 196px'}}>
        <Typography component="h1" sx={{marginBottom: 2}}>
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
              required: 'This field is required',
            }}
            required={true}
            style={{marginBottom: '24px'}}
          />
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
          <Link href={'/auth/sign-in'}>
            <Typography sx={{marginLeft: '5px', color: 'red'}}>
              Log in
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box sx={{width: '943px', height: '930px', position: 'relative'}}>
        <Image
          src="/images/signUpBanner.png"
          alt="picture of our brand"
          fill={true}
        />
      </Box>
    </Box>
  );
}
