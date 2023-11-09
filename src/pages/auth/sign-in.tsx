import {SubmitHandler, useForm} from 'react-hook-form';
import {SignInResponse, signIn} from 'next-auth/react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import theme from '@/styles/theme/commonTheme';
import {styles} from '@/styles/authPagesStyles';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit: SubmitHandler<SignInType> = async data => {
    const response: SignInResponse | undefined = await signIn('credentials', {
      identifier: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      redirect: false,
    });
    if (response?.ok) {
      localStorage.setItem('signInJustNow', JSON.stringify(true));
      router.push('/');
    } else {
      toast.error('Wrong credentials!');
    }
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
            <Box sx={styles.form}>
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
                required
                errorMessage={errors.email?.message}
              />
              <Input
                labelText="Password"
                register={register}
                name="password"
                validationSchema={{
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Min length is 8',
                  },
                }}
                required
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

            <Button type="submit">Sign in</Button>
          </Box>
          <Box sx={styles.linksContainer}>
            <Typography component="span">Don’t have an account?</Typography>
            <Link href={'/auth/sign-up'} style={styles.link}>
              <Typography>Sign up</Typography>
            </Link>
          </Box>

          <Button type="submit" variant="contained">
            Sign in
          </Button>
        </Box>
        <Box
          sx={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}
        >
          <Typography component="span">Don’t have an account?</Typography>
          <Link href={'/auth/sign-up'}>
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
