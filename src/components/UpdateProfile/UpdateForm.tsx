import {UserRequest, UserResponse} from '@/types/user';
import {Box, SxProps, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import UpdateFormContainer from './UpdateFormContainer';
import UpdateProfileAvatarContainer from './UpdateProfileAvatarContainer';
import {createContext} from 'react';

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

  return (
    <UpdateFormContext.Provider value={{isUserDataLoading}}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
        sx={styles.form}
      >
        <UpdateProfileAvatarContainer
          formProps={{register, control, getValues, setValue, formState}}
        />
        <Typography sx={styles.paragraph}>
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <UpdateFormContainer
          formProps={{register, control, getValues, setValue, formState}}
        />
      </Box>
    </UpdateFormContext.Provider>
  );
};

export default UpdateForm;
