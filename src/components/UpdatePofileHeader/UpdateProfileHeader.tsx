import {Avatar, Box, SxProps} from '@mui/material';
import Image from 'next/image';
import HiddenInput from '../Inputs/HiddenInput';
import {Button} from '../Button/Button';

const styles: Record<string, SxProps> = {
  headerBox: {
    marginBottom: {xs: 2, sm: 6},
    display: 'flex',
    justifyContent: 'space-beetwen',
    alignItems: 'center',
  },
  buttonsBox: {display: 'flex', flexDirection: 'column', gap: {xs: 2, sm: 3}},
  avatarContainer: {
    marginRight: {xs: 3, sm: 9.5},
    width: {xs: 100, sm: 150},
    height: {xs: 100, sm: 150},
    borderRadius: '100%',
  },
  avatar: {
    width: {xs: 100, sm: 150},
    height: {xs: 100, sm: 150},
    backgroundColor: 'primary.main',
  },
};

const UpdateProfileHeader = () => {
  const userImage = null;

  return (
    <Box sx={styles.headerBox}>
      <Box sx={styles.avatarContainer}>
        {userImage && <Image src={''} alt="Jane Meldrum" fill />}
        {!userImage && <Avatar sx={styles.avatar} src="/" alt="Jane Meldrum" />}
      </Box>
      <Box sx={styles.buttonsBox}>
        <Button isTransparent width="152" type="button">
          Change photo
          <HiddenInput type="file" />
        </Button>
        <Button width="152" type="button">
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfileHeader;
