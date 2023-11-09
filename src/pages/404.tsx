import Image from 'next/image';
import {Box, Typography, Stack, SxProps} from '@mui/material';
import {Button} from '@/components/Button/Button';
import Header from '@/components/Header';
import Link from 'next/link';

const styles: Record<string, SxProps> = {
  page: {
    height: "100vh",
    flexGrow: 1,
    flexDirection: "column",
  },
  main: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "28px",
    padding: {sm: "0 20px", md: "0 60px", lg: '0 120px'},
    width: "50vw",
  },
  banner: {
    width: "50vw",
    height: "100%",
    position: 'relative',
  }
}

const Error404 = () => {
  return (
      <Stack sx={styles.page}>
        <Header />
        <Box sx={styles.main}>
          <Box sx={styles.info}>
            <Typography variant="h1">Error 404</Typography>
            <Typography variant="h4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna</Typography>
            <Stack direction="row" spacing={4}>
              <Link  href='/'>
                <Button width="152px" height="40px" isTransparent={true}>Go Back</Button>
              </Link>
              <Link  href='/'>
                <Button width="152px" height="40px" isTransparent={false}>Home</Button>
              </Link>
            </Stack>
          </Box>
          <Box sx={styles.banner}>
            <Image
              src="/images/404PageBanner.jpeg"
              alt="404 error"
              objectFit="cover"
              fill
            />
          </Box>
        </Box>
      </Stack>
  );
};

export default Error404;