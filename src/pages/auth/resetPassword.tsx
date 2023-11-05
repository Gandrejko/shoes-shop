import {useRouter, useSearchParams} from 'next/navigation';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Typography} from '@mui/material';
import Link from 'next/link';
import {CustomButton} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';
import axios from 'axios';
import {useMutation} from 'react-query';
import {useEffect} from 'react';

type ResetPasswordType = {
  password: string;
  confirmPassword: string;
  code: string;
};

export default function ResetPassword() {
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
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Omit<ResetPasswordType, 'code'>>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';

  useEffect(() => {
    if (isSuccess) {
      router.push('/auth/signIn');
    }
  }, [router, isSuccess]);

  const onSubmit: SubmitHandler<
    Omit<ResetPasswordType, 'code'>
  > = async data => {
    mutateAsync({...data, code});
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{width: '960px', margin: '208px 286px 0 196px'}}>
        <Typography component="h1" sx={{fontSize: 45, marginBottom: 2}}>
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
            style={{marginBottom: '37px'}}
          />

          <CustomButton type="submit">Reset password</CustomButton>
        </Box>
        <Box
          sx={{display: 'flex', justifyContent: 'center', marginTop: '16px'}}
        >
          <Link href={'/auth/signIn'}>
            <Typography>Back to log in</Typography>
          </Link>
        </Box>
      </Box>
      <Image
        src="/images/resetForgotBanner.png"
        alt="picture of our brand"
        width={960}
        height={930}
      />
    </Box>
  );
}
