import Image from 'next/image';
import {Box, Typography, Stack, SxProps} from '@mui/material';
import {Button} from '@/components/Button/Button';
import Header from '@/components/Header';

const styles: Record<string, SxProps> = {
  page: {
    height: "100vh",
  },
  main: {
    width: "100vw",
    height: {sm: "calc(100vh - 60px)", md: "calc(100vh - 120px)"},
    position: 'relative',
    paddingTop: "10%",
    paddingLeft: "10%",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    width: "538px",
  },
  text: {
    zIndex: 1,
  }
}

const Error500 = () => {
  return (
      <Box sx={styles.page}>
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
                <Button width="152px" height="40px" isTransparent={true}>Go Back</Button>
                <Button width="152px" height="40px" isTransparent={false}>Home</Button>
              </Stack>
            </Box>
          </Box>
      </Box>
  );
};

export default Error500;