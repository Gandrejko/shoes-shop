import {Box} from '@mui/material';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {Button} from '../Button/Button';
import {Input} from '../Inputs/Input';

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

const jwtToken = 'jwtToken';

type Props = {
  imageId: number;
};

const UpdateProfileForm = ({imageId}: Props) => {
  // const {data, update} = useSession();
  const queryClient = useQueryClient();
  // const currentUser = data?.user;

  const currentUser = {
    id: 395,
    username: 'Nas',
    email: 'nas@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2023-11-04T21:40:04.384Z',
    updatedAt: '2023-11-07T11:05:24.437Z',
    phoneNumber: '1312313',
    firstName: 'Nas',
    lastName: 'Nas',
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Partial<UserDataType>>({
    defaultValues: {
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
    },
  });

  const updateCurrentUserMutation = useMutation({
    mutationFn: async (userUpdateData: Partial<UserDataType>) => {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      return axios.put(
        `https://shoes-shop-strapi.herokuapp.com/api/users/${currentUser.id}`,
        {...userUpdateData, avatar: imageId},
        config,
      );
    },
    onSuccess: newData => {
      queryClient.invalidateQueries({queryKey: ['currentUser']});
      // update(newData);
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
