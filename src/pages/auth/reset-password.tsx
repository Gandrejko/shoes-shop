import {useRouter, useSearchParams} from 'next/navigation';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Button, Typography, useMediaQuery} from '@mui/material';
import Link from 'next/link';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import logoIcon from '../../../public/icons/logo.svg';
import theme from '@/styles/theme/commonTheme';
import {styles} from '@/styles/authPagesStyles';

type ResetPasswordType = {
  password: string;
  confirmPassword: string;
  code: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const {mutate, isSuccess} = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (userData: ResetPasswordType) =>
      axios.post(
        'https://shoes-shop-strapi.herokuapp.com/api/auth/reset-password',
        {
          password: userData.password,
          passwordConfirmation: userData.confirmPassword,
          code: userData.code,
        },
      ),
    onSuccess: value => {
      toast.success('Password was changed!');
      router.push('/auth/sign-in');
    },
    onError: e => {
      toast.error('Something went wrong, try again later');
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Omit<ResetPasswordType, 'code'>>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';

  const onSubmit: SubmitHandler<
    Omit<ResetPasswordType, 'code'>
  > = async data => {
    mutate({...data, code});
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
            Reset password
          </Typography>
          <Typography variant="body1" sx={styles.titleText}>
            Please create new password here
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={styles.formContainer}
          >
            <Box sx={styles.form}>
              <Input
                labelText="Password"
                register={register}
                name="password"
                validationSchema={{
                  required: 'Min length is 8',
                  minLength: {
                    value: 8,
                    message: 'Min length is 8',
                  },
                }}
                type="password"
                errorMessage={errors.password?.message}
              />
              <Input
                labelText="Confirm password"
                register={register}
                name="confirmPassword"
                validationSchema={{
                  required: 'Your passwords do no match',
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Your passwords do no match';
                    }
                  },
                }}
                type="password"
                errorMessage={errors.confirmPassword?.message}
              />
            </Box>

            <Button type="submit">Reset password</Button>
          </Box>
          <Box sx={styles.linksContainer}>
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
              style={{objectFit: 'cover'}}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
