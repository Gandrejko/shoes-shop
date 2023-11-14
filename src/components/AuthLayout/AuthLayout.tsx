import {Box, Typography, useMediaQuery} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';
import logoIcon from '../../../public/icons/logo.svg';
import theme from '@/styles/theme/commonTheme';
import {styles} from '../../styles/authPagesStyles';
import {ReactNode} from 'react';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtTitle: string;
};

const chooseCurrentImage = (currentPage: string) => {
  if (currentPage === 'sign-in') return 'signInBanner.png';
  if (currentPage === 'sign-up') return 'signUpBanner.png';
  if (currentPage === 'reset-password') return 'resetForgotBanner.png';
  if (currentPage === 'forgot-password') return 'resetForgotBanner.png';
};

export const AuthLayot = ({children, title, subtTitle}: AuthLayoutProps) => {
  const router = useRouter();
  const currentTab = router.route.replace('/auth/', '');
  const currentImage = chooseCurrentImage(currentTab);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            {title}
          </Typography>
          <Typography component="h5" sx={styles.titleText}>
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
