import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Typography} from '@mui/material';
import Link from 'next/link';
import {CustomButton} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';

interface IForgotPassword {
  email: string;
}

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IForgotPassword>();

  const onSubmit: SubmitHandler<IForgotPassword> = async data => {
    await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/auth/forgot-password',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      },
    );
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{width: '960px', margin: '208px 286px 0 196px'}}>
        <Typography component="h2" sx={{fontSize: 45, marginBottom: 2}}>
          Forgot password?
        </Typography>
        <Typography component="h5" sx={{fontSize: 15, marginBottom: 6}}>
          Don’t worry, we’ll send you reset instructions.
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
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            }}
            required={true}
            style={{marginBottom: '24px'}}
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
