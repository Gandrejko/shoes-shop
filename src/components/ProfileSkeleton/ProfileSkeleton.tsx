import {Box, Skeleton, Stack} from '@mui/material';

const styles = {
  container: {
    alignItems: 'end',
    gap: {xs: 2, sm: 3},
  },
  avatarContainer: {
    width: {xs: 64, sm: 90, md: 120},
    height: {xs: 64, sm: 90, md: 120},
  },
  profileInfoContainer: {
    marginBottom: {xs: 0, sm: 1, md: 3},
  },
  profileInfo: {
    width: {xs: '200px', sm: '250px', md: '350px'},
    height: {xs: '20px', sm: '26px'},
  },
};

export const ProfileSkeleton = () => {
  return (
    <Box>
      <Stack direction="row" sx={styles.container}>
        <Skeleton variant="circular" sx={styles.avatarContainer} />
        <Stack sx={styles.profileInfoContainer}>
          <Skeleton variant="text" sx={styles.profileInfo} />
          <Skeleton variant="text" sx={styles.profileInfo} />
        </Stack>
      </Stack>
    </Box>
  );
};
