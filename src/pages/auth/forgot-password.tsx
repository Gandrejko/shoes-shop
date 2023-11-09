import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Typography, useMediaQuery} from '@mui/material';
import Link from 'next/link';
import {Button} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import logoIcon from '../../../public/icons/logo.svg';
import theme from '@/styles/theme/commonTheme';
import {styles} from '@/styles/authPagesStyles';

type ForgotPasswordType = {
  email: string;
};

export default function ForgotPassword() {
  const router = useRouter();
  const {mutate} = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: (userData: ForgotPasswordType) =>
      axios.post(
        'https://shoes-shop-strapi.herokuapp.com/api/auth/forgot-password',
        userData,
      ),
    onSuccess: () => {
      toast.info('On your email was sent information about recovery');
      router.push('/auth/reset-password');
    },
    onError: () => {
      toast.error('Something went wrong, try again later');
    },
  });
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordType>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit: SubmitHandler<ForgotPasswordType> = async data => {
    mutate(data);
  };

  return (
    <Box sx={styles.tab}>
      <Box sx={styles.header}>
        <Link href="/" style={styles.headerImage}>
          <Image src={logoIcon} alt="" />
        </Link>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.wrapper}>
          <Typography variant="h1" sx={styles.title}>
            Forgot password?
          </Typography>
          <Typography variant="h5" sx={styles.titleText}>
            Don’t worry, we’ll send you reset instructions.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={styles.form}
          >
            <Box sx={{marginBottom: '24px'}}>
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
            </Box>

            <Button type="submit">Reset password</Button>
          </Box>
          <Box sx={styles.fpLinksContainer}>
            <Link href={'/auth/reset-password'} style={styles.link}>
              <Typography>Go to reset password page</Typography>
            </Link>
            <Link href={'/auth/sign-in'} style={styles.link}>
              <Typography>Back to log in</Typography>
            </Link>
          </Box>
        </Box>
        {!isMobile && (
          <Box sx={styles.imageWrapper}>
            <Image
              src="/images/resetForgotBanner.png"
              alt="picture of our brand"
              fill={true}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
