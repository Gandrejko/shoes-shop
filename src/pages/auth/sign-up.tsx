import {Button} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import {Box, Typography, useMediaQuery} from '@mui/material';
import Link from 'next/link';
import {SubmitHandler, useForm} from 'react-hook-form';
import Image from 'next/image';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import logoIcon from '../../../public/icons/logo.svg';
import theme from '@/styles/theme/commonTheme';
import {styles} from './styles';

type SignUpType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {mutate} = useMutation({
    mutationKey: ['sign-up'],
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
    mutate(restData);
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
            Create an account
          </Typography>
          <Typography variant="body1" sx={styles.titleText}>
            Create an account to get an easy access to your dream shopping
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={styles.formContainer}
          >
            <Box sx={styles.form}>
              <Input
                labelText="Name"
                register={register}
                name="username"
                validationSchema={{
                  required: 'This field is required',
                }}
                required
                errorMessage={errors.username?.message}
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
                required
                type="password"
                errorMessage={errors.confirmPassword?.message}
              />
            </Box>

            <Button type="submit">Sign up</Button>
          </Box>
          <Box sx={styles.linksContainer}>
            <Typography component="span">Already have an account?</Typography>
            <Link href={'/auth/sign-in'} style={styles.link}>
              <Typography>Log in</Typography>
            </Link>
          </Box>
        </Box>
        {!isMobile && (
          <Box sx={styles.imageWrapper}>
            <Image
              src="/images/signUpBanner.png"
              alt="picture of our brand"
              fill={true}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
