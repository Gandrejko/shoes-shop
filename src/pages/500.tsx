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
    position: 'relative',
  },
  wrapper: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    maxWidth: "538px",
    justifyContent: "center",
    marginLeft: "10vw",
  },
  text: {
    zIndex: 1,
  }
}

const Error500 = () => {
  return (
      <Stack sx={styles.page}>
          <Header />
          <Box sx={styles.main}>
            <Image
              src="/images/500PageBanner.png"
              alt="500 error"
              fill
              objectFit="cover"
            />
            <Box sx={styles.wrapper}>
              <Typography variant="h1" sx={styles.text}>We lost that page...</Typography>
              <Typography variant="h4" sx={styles.text}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna</Typography>
              <Stack direction="row" spacing={4}>
                <Link href='/'>
                  <Button width="152px" height="40px" isTransparent={true}>Go Back</Button>
                </Link>
                <Link href='/'>
                  <Button width="152px" height="40px" isTransparent={false}>Home</Button>
                </Link>
              </Stack>
            </Box>
          </Box>
      </Stack>
  );
};

export default Error500;