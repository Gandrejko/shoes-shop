import {UpdateFormType} from '@/pages/settings';
import {Avatar, Box, Button, InputBase, SxProps} from '@mui/material';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
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
    fontSize: 45,
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
  const token = session?.user.accessToken;
  const avatar = formProps.getValues().avatar;
  const inputRef = useRef<HTMLInputElement>();

  const {mutate: uploadImage} = useMutation({
    mutationFn: async (formData: FormData) => {
      const url = `${process.env.API_URL}/upload`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post(url, formData, config);
      return res.data[0];
    },
    onSuccess: (data: any) => {
      formProps.setValue('avatar', {id: data.id, url: data.url});
    },
    onError: error => {
      toast.error('Something went wrong. Please, try again!');
    },
  });

  const {mutate: deleteImage} = useMutation({
    mutationFn: async (id: number) => {
      const url = `${process.env.API_URL}/upload/files/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.delete(url, config);
      return res.data;
    },
    onSuccess: () => {
      formProps.setValue('avatar', null);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

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
            src={avatar.url}
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
          onClick={() => deleteImage(avatar.id)}
          sx={styles.button}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfileAvatarContainer;
