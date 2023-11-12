import {Avatar, Box, Button, SxProps} from '@mui/material';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {ChangeEvent} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {toast} from 'react-toastify';
import HiddenInput from '../Inputs/HiddenInput';

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
    overflow: 'hidden',

    width: {xs: 100, sm: 150},
    height: {xs: 100, sm: 150},
    marginRight: {xs: 3, sm: 9.5},
    borderRadius: '100%',
  },
  avatar: {
    width: {xs: 100, sm: 150},
    height: {xs: 100, sm: 150},
    backgroundColor: 'primary.main',
  },
  button: {
    width: 152,
  },
};

type UserDataType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatar: any;
};

type UpdateProfileAvatarContainerProps = {
  formProps: Pick<
    UseFormReturn<Partial<UserDataType>>,
    'register' | 'control' | 'getValues' | 'setValue' | 'formState'
  >;
};

const UpdateProfileAvatarContainer = ({
  formProps,
}: UpdateProfileAvatarContainerProps) => {
  const {data: session} = useSession();
  const currentUser = session?.user;
  const token = session?.user.accessToken;

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
      toast.error(error.message);
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

  const avatar = formProps.getValues().avatar;

  return (
    <Box sx={styles.headerBox}>
      <Box sx={styles.avatarContainer}>
        {avatar ? (
          <Image
            src={avatar.url}
            alt={currentUser?.username}
            fill
            style={{objectFit: 'cover'}}
          />
        ) : (
          <Avatar sx={styles.avatar} src="/" alt={currentUser?.username} />
        )}
      </Box>
      <Box sx={styles.buttonsBox}>
        <Button variant="outlined" component="label" sx={styles.button}>
          Change photo
          <HiddenInput type="file" onChange={handleFileChange} />
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
