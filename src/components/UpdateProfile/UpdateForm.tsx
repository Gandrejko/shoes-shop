import {Box} from '@mui/material';
import {useSession} from 'next-auth/react';
import {useForm} from 'react-hook-form';
import UpdateFormContainer from './UpdateFormContainer';
import UpdateProfileAvatarContainer from './UpdateProfileAvatarContainer';

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

type UpdateFormProps = {
  onSubmit: (data: any) => void;
};

const UpdateForm = ({onSubmit}: UpdateFormProps) => {
  const {data: session} = useSession();
  const currentUser = session?.user;
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: {errors},
  } = useForm<Partial<UserDataType>>({
    defaultValues: {
      firstName: currentUser.firstName ?? '',
      lastName: currentUser.lastName ?? '',
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber ?? '',
      avatar: currentUser.avatar,
    },
  });

  const handleOnSubmit = () => {
    const values = getValues();
    const data = Object.keys(values).reduce((acc, key) => {
      const value = (values as any)[key];
      if (Boolean(value)) {
        (acc as any)[key] = value;
      }
      return acc;
    });

    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <UpdateFormContainer
        formProps={{register, control, getValues, setValue, formState}}
      />
      <UpdateProfileAvatarContainer
        formProps={{register, control, getValues, setValue, formState}}
      />
    </Box>
  );
};

export default UpdateForm;
