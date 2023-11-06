import {Box} from '@mui/material';
import {Input} from '../Inputs/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import {CustomButton} from '../Button/Button';
import {useMutation} from 'react-query';
import axios from 'axios';

type UpdateProfileFormType = {
  userName: string;
  userSurname: string;
  email: string;
  phone: string;
};

const CURUSERDATA = {
  id: '123',
  userName: 'Jane',
  userSurname: 'Meldrum',
  email: 'rhc23@mail.com',
  phone: '(949) 354-2574',
};

const UpdateProfileForm: React.FC = userdata => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<UpdateProfileFormType>();

  const {mutateAsync, isSuccess} = useMutation({
    mutationKey: '',
    mutationFn: (userUpdateData: Partial<UpdateProfileFormType>) =>
      axios.put(
        `https://shoes-shop-strapi.herokuapp.com/api/users${CURUSERDATA.id}`,
        userUpdateData,
      ),
  });

  const formSubmitHadler: SubmitHandler<UpdateProfileFormType> = async data => {
    mutateAsync(data);
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
          defaultValue={CURUSERDATA.userName}
          labelText="Name"
          name="userName"
          register={register}
          validationSchema={{
            pattern: {
              required: true,
            },
          }}
          style={{marginBottom: 24}}
        />
        <Input
          type="text"
          defaultValue={CURUSERDATA.userSurname}
          labelText="Surname"
          name="userSurname"
          register={register}
          validationSchema={{
            required: true,
          }}
          style={{marginBottom: 24}}
        />
        <Input
          type="mail"
          defaultValue={CURUSERDATA.email}
          labelText="Email"
          name="email"
          register={register}
          disabled
          validationSchema={{
            pattern: {
              value: /\S+@\S+\.\S+/,
            },
          }}
          style={{marginBottom: 24}}
        />
        <Input
          type="tel"
          defaultValue={CURUSERDATA.phone}
          labelText="Phone number"
          name="phoneNumber"
          register={register}
          validationSchema={{
            required: true,
            pattern: {
              value: /^(\d{3})\s\d{3}-\d{4}/,
            },
          }}
        />
      </Box>
      <CustomButton width="152" alignSelf="flex-end">
        Save changes
      </CustomButton>
    </Box>
    // {isSuccess && //To show success message}
  );
};

export default UpdateProfileForm;
