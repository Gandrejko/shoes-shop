import {useSearchParams} from 'next/navigation';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Typography} from '@mui/material';
import Link from 'next/link';
import {CustomButton} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';
interface IResetPassword {
  password: string;
  passwordConfirmation: string;
}

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<IResetPassword>();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';

  const onSubmit: SubmitHandler<IResetPassword> = async data => {
    await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/auth/reset-password',
      {
        method: 'POST',
        body: JSON.stringify({...data, code}),
        headers: {'Content-Type': 'application/json'},
      },
    );
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{width: '960px', margin: '208px 286px 0 196px'}}>
        <Typography component="h2" sx={{fontSize: 45, marginBottom: 2}}>
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
            name="identifier"
            validationSchema={{
              required: true,
              minLength: {
                value: 6,
                message: 'min length is 6',
              },
            }}
            required={true}
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
        src="/images/resetPasswordBanner.png"
        alt="picture of our brand"
        width="960"
        height="1112"
      />
    </Box>
  );
}
