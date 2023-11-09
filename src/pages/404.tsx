import Image from 'next/image';
import {Box, Typography, Stack, SxProps, useMediaQuery} from '@mui/material';
import {Button} from '@/components/Button/Button';
import Header from '@/components/Header';
import Link from 'next/link';
import theme from '@/styles/theme/commonTheme';

const styles: Record<string, SxProps> = {
  page: {
    height: '100vh',
    flexGrow: 1,
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '28px',
    padding: {sm: '0 20px', md: '0 60px', lg: '0 120px'},
    width: '50vw',
  },
  banner: {
    width: '50vw',
    height: '100%',
    position: 'relative',
  },
  mobile: {
    width: '100vw',
    flexBasis: '81.25%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10vh',
  },
  text: {
    maxWidth: '305px',
    position: 'relative',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
};

const Error404 = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack sx={styles.page}>
      {isMobile ? (
        <>
          <Box sx={styles.mobile}>
            <Image
              src="/images/404PageBanner.png"
              alt="404 error"
              objectFit="cover"
              fill
            />
            <Stack spacing={2} sx={styles.text}>
              <Typography variant="h1">Error 404</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam
              </Typography>
            </Stack>
          </Box>
          <Box sx={styles.buttons}>
            <Stack direction="row" spacing={3}>
              <Link href="/">
                <Button width="152px" height="40px" isTransparent={true}>
                  Go Back
                </Button>
              </Link>
              <Link href="/">
                <Button width="152px" height="40px" isTransparent={false}>
                  Home
                </Button>
              </Link>
            </Stack>
          </Box>
        </>
      ) : (
        <>
          <Header />
          <Box sx={styles.main}>
            <Box sx={styles.info}>
              <Typography variant="h1">Error 404</Typography>
              <Typography variant="h4">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              </Typography>
              <Stack direction="row" spacing={4} flexWrap="wrap">
                <Link href="/">
                  <Button width="152px" height="40px" isTransparent={true}>
                    Go Back
                  </Button>
                </Link>
                <Link href="/">
                  <Button width="152px" height="40px" isTransparent={false}>
                    Home
                  </Button>
                </Link>
              </Stack>
            </Box>
            <Box sx={styles.banner}>
              <Image
                src="/images/404PageBanner.png"
                alt="404 error"
                objectFit="cover"
                fill
              />
            </Box>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default Error404;
