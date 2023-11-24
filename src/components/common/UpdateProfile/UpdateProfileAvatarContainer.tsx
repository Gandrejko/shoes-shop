import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  InputBase,
  SxProps,
} from '@mui/material';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {ChangeEvent, useContext, useRef} from 'react';
import {UpdateFormContext} from './UpdateForm';

const styles: Record<string, SxProps> = {
  headerBox: {
    marginBottom: 2,
    display: 'flex',
    justifyContent: 'space-beetwen',
    alignItems: 'center',
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: {xs: 2, sm: 3},
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: {xs: 100, sm: 150},
    height: {xs: 100, sm: 150},
    marginRight: {xs: 3, sm: 9.5},
    borderRadius: '100%',
    overflow: 'hidden',
  },
  avatar: {
    fontSize: 40,
    textTransform: 'uppercase',
    width: {xs: 100, sm: 150},
    height: {xs: 100, sm: 150},
    color: 'common.white',
    backgroundColor: 'primary.main',
  },
  button: {
    fontSize: {xs: 12, sm: 16},
    width: {xs: 117, sm: 152},
    '&.Mui-disabled': {
      color: 'grey.A200',
      backgroundColor: 'grey.A100',
    },
  },
  inputHidden: {display: 'none'},
};

const UpdateProfileAvatarContainer = () => {
  const {
    isUserDataLoading,
    uploadImage,
    isUploadImageLoading,
    deleteImage,
    isDeleteImageLoading,
    getValues,
  } = useContext(UpdateFormContext);

  const {data: session} = useSession();
  const currentUser = session?.user;
  const avatar = getValues().avatar;
  const inputRef = useRef<HTMLInputElement>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const formData = new FormData();
    formData.append('files', files[0]);

    uploadImage(formData);
  };

  return (
    <Box sx={styles.headerBox}>
      <Box sx={styles.avatarContainer}>
        {isDeleteImageLoading || isUploadImageLoading ? (
          <CircularProgress />
        ) : (
          <Avatar
            sx={styles.avatar}
            src={avatar?.url!}
            alt={currentUser?.username}
          >
            {(currentUser?.firstName ||
              currentUser?.username ||
              ' ')[0].toUpperCase()}
          </Avatar>
        )}
      </Box>
      <Box sx={styles.buttonsBox}>
        <Button
          variant="outlined"
          component="label"
          // disabled={
          //   isDeleteImageLoading || isUploadImageLoading || isUserDataLoading
          // }
          disabled={true} //TODO: delete this line
          sx={styles.button}
        >
          Change photo
          <InputBase
            inputProps={{ref: inputRef, accept: 'image/*'}}
            type="file"
            sx={styles.inputHidden}
            onChange={handleFileChange}
          />
        </Button>
        <Button
          variant="contained"
          type="button"
          // disabled={
          //   isDeleteImageLoading || isUploadImageLoading || isUserDataLoading
          // }
          disabled={true} //TODO: delete this line
          onClick={() => deleteImage(avatar?.id!)}
          sx={styles.button}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfileAvatarContainer;
