import {Box, CircularProgress} from '@mui/material';

const Loader = () => {
  return (
    <Box sx={{display: 'flex', color: 'grey.A200'}}>
      <CircularProgress color="inherit"/>
    </Box>
  );
};

export default Loader;
