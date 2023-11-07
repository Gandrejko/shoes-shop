import {Box} from '@mui/material';
import {Input} from '../Inputs/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button} from '../Button/Button';
import {useMutation} from 'react-query';
import axios from 'axios';
import {toast} from 'react-toastify';

type CurUserDataType = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: number;
};

const updateFormPlaceholders = {
  phone: 11111,
  lastName: 'Last Name',
};

type UpdateProfileFormType = {
  // id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
};

const CURUSERDATA: Partial<CurUserDataType> = {
  id: 123,
  username: 'Jane',
  firstName: 'Jane',
  lastName: 'Meldrum',
  email: 'rhc23@mail.com',
  phone: 9999,
  password: 777,
};

const UpdateProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<UpdateProfileFormType>({
    defaultValues: {
      firstName: CURUSERDATA.firstName,
      lastName: CURUSERDATA.lastName || updateFormPlaceholders.lastName,
      email: CURUSERDATA.email,
      phoneNumber: CURUSERDATA.phone || updateFormPlaceholders.phone,
    },
  });

  const {mutateAsync} = useMutation({
    mutationFn: (userUpdateData: Partial<UpdateProfileFormType>) =>
      axios.put(
        `https://shoes-shop-strapi.herokuapp.com/api/users${CURUSERDATA.id}`,
        userUpdateData,
      ),
    onSuccess: () => {
      toast.success('You profile data is successfully updated!');
    },
    onError: () => {
      toast.error('Something went wrong. Please, try again.');
    },
  });

  const formSubmitHadler: SubmitHandler<
    UpdateProfileFormType
  > = async updatedData => {
    mutateAsync(updatedData);
  };

  return (
    <Box
      component="form"
      sx={{display: 'flex', flexDirection: 'column', maxWidth: '100%'}}
      onSubmit={handleSubmit(formSubmitHadler)}
    >
      <Box sx={{mb: 7}}>
        <Input
          defaultValue={CURUSERDATA.firstName}
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
          defaultValue={CURUSERDATA.lastName}
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
          defaultValue={CURUSERDATA.email}
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
          defaultValue={CURUSERDATA.phone}
          type="tel"
          labelText="Phone number"
          name="phoneNumber"
          register={register}
          validationSchema={{
            required: 'Phone number is required',
            pattern: {
              value: /^(\d{3})\s\d{3}-\d{4}/,
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
