import {UserDataType} from '@/pages/settings';
import {Box, SxProps, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
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

type UpdateFormProps = {
  onSubmit: (data: any) => void;
  userData: Partial<UserDataType>;
};

const UpdateForm = ({onSubmit, userData}: UpdateFormProps) => {
  const {register, handleSubmit, control, getValues, setValue, formState} =
    useForm<Partial<UserDataType>>({
      defaultValues: {
        firstName: userData?.firstName ?? '',
        lastName: userData?.lastName ?? '',
        email: userData?.email,
        phoneNumber: userData?.phoneNumber ?? '',
        avatar: userData?.avatar ?? null,
      },
    });

  const handleOnSubmit = () => {
    const data = getValues();
    onSubmit(data);
  };

  return (
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
  );
};

export default UpdateForm;