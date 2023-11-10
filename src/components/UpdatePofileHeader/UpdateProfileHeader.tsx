import {Avatar, Box, SxProps} from '@mui/material';
import {useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import {ChangeEvent, Dispatch} from 'react';
import {toast} from 'react-toastify';
import {Button} from '../Button/Button';
import HiddenInput from '../Inputs/HiddenInput';
import {useSession} from 'next-auth/react';

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
    fontSize: {xs: 30, sm: 45},
    width: {xs: 100, sm: 150},
    height: {xs: 100, sm: 150},
    backgroundColor: 'primary.main',
  },
};

type Props = {
  image: any;
  currentUser: any;
  setImage: Dispatch<any>;
};

const UpdateProfileHeader = ({image, currentUser, setImage}: Props) => {
  const jwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk1LCJpYXQiOjE2OTkzNzU4OTQsImV4cCI6MTcwMTk2Nzg5NH0.Toa8YhgAK-KC1FWVmbwLLTUrRpsZHdOZ7_fvTl_Mei0';

  const {mutate: uploadImage} = useMutation({
    mutationFn: async (formData: FormData) => {
      const url = 'https://shoes-shop-strapi.herokuapp.com/api/upload';
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post(url, formData, config);
      return res.data[0];
    },
    onSuccess: data => {
      setImage(data);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const {mutate: deleteImage} = useMutation({
    mutationFn: async (id: number) => {
      const url = `https://shoes-shop-strapi.herokuapp.com/api/upload/files/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const res = await axios.delete(url, config);
      return res.data;
    },
    onSuccess: () => {
      setImage(null);
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
        {image ? (
          <Image
            src={image.url}
            alt={currentUser.username}
            fill
            style={{objectFit: 'cover'}}
          />
        ) : (
          <Avatar sx={styles.avatar} src="/" alt={currentUser.username} />
        )}
      </Box>
      <Box sx={styles.buttonsBox}>
        <Button isTransparent width="152" type="button" component="label">
          Change photo
          <HiddenInput type="file" onChange={handleFileChange} />
        </Button>
        <Button width="152" type="button" onClick={() => deleteImage(image.id)}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfileHeader;
