import {Box, Typography} from '@mui/material';
import UpdateProfileForm from '../Forms/UpdateProfileForm';
import UpdateProfileHeader from '../UpdatePofileHeader/UpdateProfileHeader';

const styles = {
  box: {
    display: 'flex',
    padding: 6.5,
    flex: 5,
  },
  h1: {
    fontWeight: 500,
    fontSize: 45,
    marginBottom: 4.5,
  },
  paragraph: {
    fontSize: 15,
    fontWeight: 300,
    marginBottom: 6,
    color: '#5C5C5C',
  },
};

const UpdateProfileContainer = () => {
  return (
    <Box sx={styles.box}>
      <Box>
        <Typography component="h1" sx={styles.h1}>
          My Profile
        </Typography>
        <UpdateProfileHeader />
        <Typography component="p" sx={styles.paragraph}>
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <UpdateProfileForm />
      </Box>
    </Box>
  );
};

export default UpdateProfileContainer;
