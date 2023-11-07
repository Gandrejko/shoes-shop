import Image from 'next/image';
import {Box, Typography, Stack, SxProps} from '@mui/material';
import {Button} from '@/components/Button/Button';
import Header from '@/components/Header';

const styles: Record<string, SxProps> = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    display: "flex",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
    padding: {md: "0 40px", lg: '0 120px'},
    width: "50vw",
    height: "calc(100vh - 120px)"
  },
  banner: {
    width: "50vw",
    height: "calc(100vh - 120px)",
    position: 'relative'
  }
}

const Error404 = () => {
  return (
      <Box sx={styles.page}>
        <Header />
        <Box sx={styles.main}>
          <Box sx={styles.info}>
            <Typography variant="h1">Error 404</Typography>
            <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna</Typography>
            <Stack direction="row" spacing={4}>
              <Button width="152px" height="40px" isTransparent={true}>Go Back</Button>
              <Button width="152px" height="40px" isTransparent={false}>Home</Button>
            </Stack>
          </Box>
          <Box sx={styles.banner}>
            <Image
              src="/images/404PageBanner.png"
              alt="404 error"
              fill
            />
          </Box>
        </Box>
      </Box>
  );
};

export default Error404;