import {Box, SxProps} from '@mui/material';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {Button} from '../Button/Button';
import {Input} from '../Inputs/Input';

const styles: Record<string, SxProps> = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
  },
  inputsBox: {
    marginBottom: {xs: 4, sm: 7},
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
};

type Props = {
  image: any;
  currentUser: any;
};

const UpdateProfileForm = ({image, currentUser}: Props) => {
  const jwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk1LCJpYXQiOjE2OTkzNzU4OTQsImV4cCI6MTcwMTk2Nzg5NH0.Toa8YhgAK-KC1FWVmbwLLTUrRpsZHdOZ7_fvTl_Mei0';
  const {data, update} = useSession();
  const queryClient = useQueryClient();
  // const currentUser = data?.user;

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Partial<UserDataType>>({
    defaultValues: {
      firstName: currentUser.firstName ?? '',
      lastName: currentUser.lastName ?? '',
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber ?? '',
    },
  });

  const {mutate} = useMutation({
    mutationFn: async (userUpdateData: Partial<UserDataType>) => {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      return axios.put(
        `https://shoes-shop-strapi.herokuapp.com/api/users/${currentUser.id}`,
        {...userUpdateData, avatar: image.id},
        config,
      );
    },
    onSuccess: newData => {
      queryClient.invalidateQueries({queryKey: ['users', currentUser.id]});
      // update(newData);
      toast.success('Your profile was successfully updated!');
    },
    onError: () => {
      toast.error('Something went wrong. Please, try again.');
    },
  });

  const formSubmitHadler: SubmitHandler<
    Partial<UserDataType>
  > = updatedData => {
    mutate(updatedData);
  };

  return (
    <Box
      component="form"
      sx={styles.form}
      onSubmit={handleSubmit(formSubmitHadler)}
    >
      <Box sx={styles.inputsBox}>
        <Input
          placeholder="First Name"
          type="text"
          labelText="Name"
          name="firstName"
          register={register}
          validationSchema={{
            required: 'Name is required',
          }}
          required={true}
          style={{marginBottom: '24px'}}
        />
        <Input
          placeholder="Last Name"
          type="text"
          labelText="Surname"
          name="lastName"
          register={register}
          validationSchema={{
            required: 'Surname is required',
          }}
          required={true}
          style={{marginBottom: '24px'}}
        />
        <Input
          placeholder="Email address"
          type="mail"
          labelText="Email"
          name="email"
          register={register}
          validationSchema={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'This email is invalid',
            },
          }}
          required={true}
          style={{marginBottom: '24px'}}
        />
        <Input
          placeholder="Phone number"
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
