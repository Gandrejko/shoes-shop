import Image from 'next/image';
import {Box, CssBaseline, Typography, Stack} from '@mui/material';
import {CustomButton} from '@/components/Button/Button';

const Error500 = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{minHeight: "100vh"}}>
          <header style={{ height: "120px"}}></header>
          <Box sx={{width: "100vw", height: "calc(100vh - 120px)", position: 'relative', paddingTop: "10%", paddingLeft: "10%"}}>
            <Image
              src="/images/500PageBanner.png"
              alt="500 error"
              fill={true}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", width: "538px"}}>
              <Typography component="h1" sx={{fontSize: "45px", fontWeight: "bold", zIndex: 1}}>We lost that page...</Typography>
              <Typography component="span" sx={{color: "#5C5C5C", fontSize: "20px", lineHeight: "28px", zIndex: 1}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna</Typography>
              <Stack direction="row" spacing={4}>
                <CustomButton width="152px" height="40px" isTransparent={true}>Go Back</CustomButton>
                <CustomButton width="152px" height="40px" isTransparent={false}>Home</CustomButton>
              </Stack>
            </Box>
          </Box>
      </Box>
    </>
  );
};

export default Error500;