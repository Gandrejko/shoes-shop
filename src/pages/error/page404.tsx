import Image from 'next/image';
import {Box, CssBaseline, Typography, Stack} from '@mui/material';
import {CustomButton} from '@/components/Button/Button';

const Page404 = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
        <header style={{ height: "120px"}}></header>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 120px 0", gap: "20px", width: "50vw", height: "calc(100vh - 120px)"}}>
            <Typography component="h1" sx={{fontSize: "45px", fontWeight: "bold"}}>Error 404</Typography>
            <Typography component="span" sx={{color: "#5C5C5C", fontSize: "20px", lineHeight: "28px"}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna</Typography>
            <Stack direction="row" spacing={4}>
              <CustomButton width="152px" height="40px" isTransparent={true}>Go Back</CustomButton>
              <CustomButton width="152px" height="40px" isTransparent={false}>Home</CustomButton>
            </Stack>
          </Box>
          <Box sx={{width: "50vw", height: "calc(100vh - 120px)", position: 'relative'}}>
            <Image
              src="/images/404PageBanner.png"
              alt="404 error"
              fill={true}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Page404;