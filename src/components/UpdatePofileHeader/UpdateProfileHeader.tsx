import {Avatar, Box} from '@mui/material';
import Image from 'next/image';
import {CustomButton} from '../Button/Button';

const styles = {
  headerBox: {
    marginBottom: 6,
    display: 'flex',
    justifyContent: 'space-beetwen',
    alignItems: 'center',
  },
  buttonsBox: {display: 'flex', flexDirection: 'column', gap: 3},
  avatar: {
    marginRight: 9.5,
    width: 150,
    height: 150,
    borderRadius: 100,
  },
};

const UpdateProfileHeader = () => {
  return (
    <Box sx={styles.headerBox}>
      <Avatar sx={styles.avatar}>
        <Image src="/images/avatar.png" alt="avatar" layout="fill" />
      </Avatar>
      <Box sx={styles.buttonsBox}>
        <CustomButton isTransparent>Change photo</CustomButton>
        <CustomButton>Delete</CustomButton>
      </Box>
    </Box>
  );
};

export default UpdateProfileHeader;
