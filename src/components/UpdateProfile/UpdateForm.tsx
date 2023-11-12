import {Box} from '@mui/material';
import {useSession} from 'next-auth/react';
import {useForm} from 'react-hook-form';
import UpdateFormContainer from './UpdateFormContainer';
import UpdateProfileAvatarContainer from './UpdateProfileAvatarContainer';
import {useQueryClient} from '@tanstack/react-query';

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

const UpdateForm = ({onSubmit, data}: UpdateFormProps) => {
  const {data: session} = useSession();
  const currentUser = session?.user;

  const {register, handleSubmit, control, getValues, setValue, formState} =
    useForm<Partial<UserDataType>>({
      defaultValues: {
        firstName: data?.firstName ?? '',
        lastName: data?.lastName ?? '',
        email: data?.email,
        phoneNumber: data?.phoneNumber ?? '',
        avatar: data?.avatar ?? null,
      },
    });

  const handleOnSubmit = () => {
    const data = getValues();
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <UpdateProfileAvatarContainer
        formProps={{register, control, getValues, setValue, formState}}
      />
      <UpdateFormContainer
        formProps={{register, control, getValues, setValue, formState}}
      />
    </Box>
  );
};

export default UpdateForm;
