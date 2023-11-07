import {useRouter, useSearchParams} from 'next/navigation';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Typography} from '@mui/material';
import Link from 'next/link';
import {Button} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';
import axios from 'axios';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

type ResetPasswordType = {
  password: string;
  confirmPassword: string;
  code: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const {mutateAsync, isSuccess} = useMutation({
    mutationFn: (userData: ResetPasswordType) =>
      axios.post(
        'https://shoes-shop-strapi.herokuapp.com/api/auth/reset-password',
        {
          password: userData.password,
          passwordConfirmation: userData.confirmPassword,
          code: userData.code,
        },
      ),
    onSuccess: () => {
      toast.success('Password was changed!');
      router.push('/auth/sign-in');
    },
    onError: () => {
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
    mutateAsync({...data, code});
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box
        sx={{
          flex: '1',
          margin: '208px 286px 0 196px',
        }}
      >
        <Typography component="h1" sx={{marginBottom: 2}}>
          Reset password
        </Typography>
        <Typography component="h5" sx={{fontSize: 15, marginBottom: 6}}>
          Please create new password here
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{display: 'flex', flexDirection: 'column'}}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginBottom: '37px',
            }}
          >
            <Input
              labelText="Password"
              register={register}
              name="password"
              validationSchema={{
                required: true,
                minLength: {
                  value: 6,
                  message: 'Min length is 6',
                },
              }}
              required={true}
              type="password"
              errorMessage={errors.password?.message}
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
              errorMessage={errors.confirmPassword?.message}
            />
          </Box>

          <Button type="submit">Reset password</Button>
        </Box>
        <Box
          sx={{display: 'flex', justifyContent: 'center', marginTop: '16px'}}
        >
          <Link href={'/auth/sign-in'}>
            <Typography>Back to log in</Typography>
          </Link>
        </Box>
      </Box>
      <Box sx={{width: '943px', height: '930px', position: 'relative'}}>
        <Image
          src="/images/resetForgotBanner.png"
          alt="picture of our brand"
          fill={true}
        />
      </Box>
    </Box>
  );
}
