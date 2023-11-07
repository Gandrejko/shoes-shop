import {Avatar, Box} from '@mui/material';
import Image from 'next/image';
import {Button} from '../Button/Button';

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
  },
};

const UpdateProfileHeader = () => {
  return (
    <Box sx={styles.headerBox}>
      <Avatar sx={styles.avatar}>
        <Image src="/images/avatar.png" alt="avatar" width={150} height={150} />
      </Avatar>
      <Box sx={styles.buttonsBox}>
        <Button isTransparent>Change photo</Button>
        <Button>Delete</Button>
      </Box>
    </Box>
  );
};

export default UpdateProfileHeader;
