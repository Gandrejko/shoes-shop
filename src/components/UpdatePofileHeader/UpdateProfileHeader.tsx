import {Avatar, Box, SxProps} from '@mui/material';
import Image from 'next/image';
import {Button} from '../Button/Button';
import HiddenInput from '../Inputs/HiddenInput';
import {useEffect} from 'react';

const styles: Record<string, SxProps> = {
  headerBox: {
    marginBottom: 6,
    display: 'flex',
    justifyContent: 'space-beetwen',
    alignItems: 'center',
  },
  buttonsBox: {display: 'flex', flexDirection: 'column', gap: 3},
  avatarContainer: {
    marginRight: 9.5,
    width: 150,
    height: 150,
    borderRadius: '100%',
  },
  avatar: {width: 150, height: 150, backgroundColor: 'primary.main'},
};

const UpdateProfileHeader = () => {
  const userImage = null;
  return (
    <Box sx={styles.headerBox}>
      <Box sx={styles.avatarContainer}>
        {userImage && <Image src={userImage} alt="Jane Meldrum" fill />}
        {!userImage && <Avatar sx={styles.avatar} src="/" alt="Jane Meldrum" />}
      </Box>
      <Box sx={styles.buttonsBox}>
        <Button isTransparent width="152" type="button" component="label">
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
