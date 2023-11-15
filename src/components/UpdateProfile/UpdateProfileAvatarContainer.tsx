import useDelete from '@/hooks/useDelete';
import usePost from '@/hooks/usePost';
import {UpdateFormType} from '@/pages/settings';
import {ImageRequest, ImageResponse} from '@/types/image';
import {Avatar, Box, Button, InputBase, SxProps} from '@mui/material';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {ChangeEvent, useRef} from 'react';
import {toast} from 'react-toastify';

const styles: Record<string, SxProps> = {
  headerBox: {
    marginBottom: {xs: 2, sm: 6},
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
    backgroundColor: 'primary.main',
  },
  button: {
    fontSize: {xs: 12, sm: 16},
    width: {xs: 117, sm: 152},
  },
  inputHidden: {display: 'none'},
};

const UpdateProfileAvatarContainer = ({formProps}: UpdateFormType) => {
  const {data: session} = useSession();
  const currentUser = session?.user;
  const avatar = formProps.getValues().avatar;
  const inputRef = useRef<HTMLInputElement>();

  const {mutate: uploadImage} = usePost<ImageRequest, ImageResponse>(
    '/upload',
    {
      onSuccess: (data: any) => {
        const image = data[0];
        formProps.setValue('avatar', {id: image.id, url: image.url});
      },
      onError: error => {
        toast.error('Something went wrong. Please, try again!');
      },
    },
    null,
  );

  const {mutate: deleteImage} = useDelete<any>(
    '/upload/files',
    {
      onSuccess: () => {
        formProps.setValue('avatar', null);
      },
      onError: error => {
        toast.error(error.message);
      },
    },
    null,
  );

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
        {avatar ? (
          <Image
            src={avatar?.url}
            alt={currentUser?.username}
            fill
            sizes="100%"
            style={{objectFit: 'cover'}}
          />
        ) : (
          <Avatar sx={styles.avatar} src="/" alt={currentUser?.username} />
        )}
      </Box>
      <Box sx={styles.buttonsBox}>
        <Button variant="outlined" component="label" sx={styles.button}>
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
          onClick={() => deleteImage(avatar?.id)}
          sx={styles.button}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfileAvatarContainer;
