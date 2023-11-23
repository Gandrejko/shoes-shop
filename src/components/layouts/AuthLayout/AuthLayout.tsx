import {Box, Typography, useMediaQuery} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';
import logoIcon from 'public/icons/logo.svg';
import theme from '@/config/theme';
import {styles} from './authPagesStyles';
import {ReactNode} from 'react';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtTitle: string;
};

const images = {
  'sign-in': 'signInBanner.png',
  'sign-up': 'signUpBanner.png',
  'reset-password': 'resetForgotBanner.png',
  'forgot-password': 'resetForgotBanner.png',
};

type ImagesType = keyof typeof images;

const chooseCurrentImage = (currentPage: ImagesType) => images[currentPage];

export const AuthLayout = ({children, title, subtTitle}: AuthLayoutProps) => {
  const router = useRouter();
  const currentTab = router.route.replace('/auth/', '') as ImagesType;
  const currentImage = chooseCurrentImage(currentTab);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={styles.tab}>
      <Box sx={styles.header}>
        <Link
          href="/products"
          style={styles.headerImage}
          aria-label="Go to products page"
        >
          <Image src={logoIcon} alt="Logo" />
        </Link>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.wrapper}>
          <Typography variant="h1" sx={styles.title}>
            {title}
          </Typography>
          <Typography component="h2" variant="h5" sx={styles.titleText}>
            {subtTitle}
          </Typography>
          {children}
        </Box>

        {!isMobile && (
          <Box sx={styles.imageWrapper}>
            <Image
              src={`/images/${currentImage}`}
              alt="picture of our brand"
              objectFit="cover"
              fill
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
