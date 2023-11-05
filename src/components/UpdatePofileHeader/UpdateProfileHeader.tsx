import {Box} from '@mui/material';
import Image from 'next/image';
import {CustomButton} from '../Button/Button';

const styles = {
  headerBox: {
    marginBottom: 6,
    display: 'flex',
    justifyContent: 'space-beetwen',
    alignItems: 'center',
  },
  image: {marginRight: 76, borderRadius: 100},
  buttonsBox: {display: 'flex', flexDirection: 'column', gap: 3},
};

const UpdateProfileHeader = () => {
  return (
    <Box sx={styles.headerBox}>
      <Image
        src="/images/avatar_test.jpg"
        alt="avatar"
        width={150}
        height={150}
        style={styles.image}
      />

      <Box sx={styles.buttonsBox}>
        <CustomButton isTransparent>Change photo</CustomButton>
        <CustomButton>Delete</CustomButton>
      </Box>
    </Box>
  );
};

export default UpdateProfileHeader;
