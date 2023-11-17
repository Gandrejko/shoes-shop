import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import theme from '@/styles/theme/commonTheme';
import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

const styles: Record<string, SxProps> = {
  page: {
    height: '100vh',
    flexGrow: 1,
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    height: '100%',
    position: 'relative',
  },
  wrapper: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    maxWidth: '538px',
    justifyContent: 'center',
    marginLeft: '10vw',
  },
  text: {
    zIndex: 1,
  },
  title: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  mobile: {
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    textAlign: 'center',
    padding: '40px',
  },
  button: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
};

const Error500 = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  return (
    <Stack sx={styles.page}>
      {isMobile ? (
        <>
          <Box sx={styles.title}>
            <Typography variant="h1">We lost that page</Typography>
          </Box>
          <Box sx={styles.mobile}>
            <Image
              src="/images/500PageBanner.png"
              alt="500 error"
              fill
              objectFit="cover"
            />
            <Typography variant="h4" sx={styles.text}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore
            </Typography>
          </Box>
          <Box sx={styles.button}>
            <Link href="#" passHref>
              <Button
                variant="contained"
                sx={{width: '152px', height: '40px'}}
                onClick={() => router.back()}
              >
                Go Back
              </Button>
            </Link>
          </Box>
        </>
      ) : (
        <>
          <HeaderLayout>
            <Box sx={styles.main}>
              <Image
                src="/images/500PageBanner.png"
                alt="500 error"
                fill
                objectFit="cover"
              />
              <Box sx={styles.wrapper}>
                <Typography variant="h1" sx={styles.text}>
                  We lost that page...
                </Typography>
                <Typography variant="h4" sx={styles.text}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </Typography>
                <Stack direction="row" spacing={4}>
                  <Link href="#" passHref>
                    <Button
                      variant="outlined"
                      sx={{width: '152px', height: '40px'}}
                      onClick={() => router.back()}
                    >
                      Go Back
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button
                      variant="contained"
                      sx={{width: '152px', height: '40px'}}
                    >
                      Home
                    </Button>
                  </Link>
                </Stack>
              </Box>
            </Box>
          </HeaderLayout>
        </>
      )}
    </Stack>
  );
};

export default Error500;
