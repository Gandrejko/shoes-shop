import useDelete from '@/hooks/useDelete';
import usePost from '@/hooks/usePost';
import {ImageRequest, ImageResponse} from '@/types/image';
import {UserRequest, UserResponse} from '@/types/user';
import {Box, SxProps, Typography} from '@mui/material';
import {createContext} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import UpdateFormContainer from './UpdateFormContainer';
import UpdateProfileAvatarContainer from './UpdateProfileAvatarContainer';

const styles: Record<string, SxProps> = {
  form: {display: 'flex', flexDirection: 'column', maxWidth: '459px'},
  paragraph: {
    fontSize: {xs: 12, sm: 15},
    fontWeight: 300,
    marginBottom: {xs: 3, sm: 6},
    color: 'text.secondary',
  },
};

export const UpdateFormContext = createContext<any>(null);

type UpdateFormProps = {
  onSubmit: (data: UserRequest) => void;
  userData: UserResponse;
  isUserDataLoading: boolean;
};

const UpdateForm = ({
  onSubmit,
  userData,
  isUserDataLoading,
}: UpdateFormProps) => {
  const {register, handleSubmit, control, getValues, setValue, formState} =
    useForm<UserRequest>({
      defaultValues: {
        firstName: userData?.firstName ?? '',
        lastName: userData?.lastName ?? '',
        email: userData?.email,
        phoneNumber: userData?.phoneNumber ?? '',
        avatar: userData?.avatar ?? null,
      },
    });

  const handleOnSubmit = (userData: UserRequest) => {
    onSubmit(userData);
  };

  const {mutate: uploadImage, isPending: isUploadImageLoading} = usePost<
    ImageRequest,
    ImageResponse
  >(
    '/upload',
    {
      onSuccess: (data: any) => {
        const image = data[0];
        setValue('avatar', {id: image.id, url: image.url});
      },
      onError: error => {
        toast.error(error.message);
      },
    },
    null,
  );

  const {mutate: deleteImage, isPending: isDeleteImageLoading} = useDelete<any>(
    '/upload/files',
    {
      onSuccess: () => {
        setValue('avatar', null);
      },
      onError: error => {
        toast.error(error.message);
      },
    },
    null,
  );

  return (
    <UpdateFormContext.Provider
      value={{
        isUserDataLoading,
        uploadImage,
        isUploadImageLoading,
        deleteImage,
        isDeleteImageLoading,
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        formState,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
        sx={styles.form}
      >
        <UpdateProfileAvatarContainer />
        <Typography sx={styles.paragraph}>
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <UpdateFormContainer />
      </Box>
    </UpdateFormContext.Provider>
  );
};

export default UpdateForm;
