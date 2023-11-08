import {Box} from '@mui/material';
import {Input} from '../Inputs/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button} from '../Button/Button';
import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';
import {toast} from 'react-toastify';

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
};

type UserUpdateFormProps = {
  currentUser: UserDataType;
};

const updatedFormPlaceholders = {
  phone: '(949) 354-2574',
  lastName: 'Last Name',
};

const UpdateProfileForm = ({currentUser}: UserUpdateFormProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Partial<UserDataType>>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName || updatedFormPlaceholders.lastName,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber || updatedFormPlaceholders.phone,
    },
  });

  const updateCurrentUserMutation = useMutation({
    mutationFn: (userUpdateData: Partial<UserDataType>) => {
      return axios.put(
        `https://shoes-shop-strapi.herokuapp.com/api/users/${currentUser.id}`,
        userUpdateData,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['currentUser']);
      toast.success('Your profile was successfully updated!');
    },
    onError: () => {
      toast.error('Something went wrong. Please, try again.');
    },
  });

  const formSubmitHadler: SubmitHandler<
    Partial<UserDataType>
  > = async updatedData => {
    updateCurrentUserMutation.mutate(updatedData);
  };

  return (
    <Box
      component="form"
      sx={{display: 'flex', flexDirection: 'column', maxWidth: '100%'}}
      onSubmit={handleSubmit(formSubmitHadler)}
    >
      <Box sx={{mb: 7}}>
        <Input
          type="text"
          labelText="Name"
          name="firstName"
          register={register}
          validationSchema={{
            required: 'Name is required',
          }}
          required={true}
          style={{marginBottom: 24}}
        />
        <Input
          type="text"
          labelText="Surname"
          name="lastName"
          register={register}
          validationSchema={{
            required: 'Surname is required',
          }}
          required={true}
          style={{marginBottom: 24}}
        />
        <Input
          type="mail"
          labelText="Email"
          name="email"
          register={register}
          disabled
          validationSchema={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'This email is invalid',
            },
          }}
          required={true}
          style={{marginBottom: 24}}
        />
        <Input
          type="tel"
          labelText="Phone number"
          name="phoneNumber"
          register={register}
          validationSchema={{
            required: 'Phone number is required',
            pattern: {
              value: /^\(\d{3}\) \d{3}-\d{4}$/,
              message: 'This phone is invalid',
            },
          }}
          required={true}
        />
      </Box>
      <Button width="152" alignSelf="flex-end" type="submit">
        Save changes
      </Button>
    </Box>
  );
};

export default UpdateProfileForm;
