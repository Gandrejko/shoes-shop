import {Box, CircularProgress, SxProps} from '@mui/material';

const styles: Record<string, SxProps> = {
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
};

const Loader = () => {
  return (
    <Box sx={styles.box}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
