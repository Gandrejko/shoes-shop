import {Box, Button} from '@mui/material';
import {Input} from '../Inputs/Input';
import {useForm} from 'react-hook-form';

const styles = {
  button: {background: '#FE645E', color: 'white', alignSelf: 'flex-end'},
};

type UpdateProfileForm = {
  userName: string;
  userSurname: string;
  email: string;
  phone: number;
  confirmPassword: string;
};

const UpdateProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<UpdateProfileForm>();

  return (
    <Box component="form" sx={{display: 'flex', flexDirection: 'column'}}>
      <Box sx={{mb: 7}}>
        <Input
          defaultValue={'Jane'}
          labelText="Name"
          name="userName"
          register={register}
          validationSchema={{
            required: true,
            pattern: {
              message: 'Required field',
            },
          }}
          style={{marginBottom: 24}}
        />
        <Input
          defaultValue={'Meldrum'}
          labelText="Surname"
          name="userSurname"
          register={register}
          validationSchema={{
            required: true,
            pattern: {
              message: 'Required field',
            },
          }}
          style={{marginBottom: 24}}
        />
        <Input
          defaultValue={'rhc23@mail.com'}
          labelText="Email"
          name="email"
          register={register}
          validationSchema={{
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'The email is invalid',
            },
          }}
          style={{marginBottom: 24}}
        />
        <Input
          defaultValue={'(949) 354-2574'}
          labelText="Phone number"
          name="phoneNumber"
          register={register}
          validationSchema={{
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'The email is invalid',
            },
          }}
        />
      </Box>
      <Button sx={styles.button}>Save changes</Button>
    </Box>
  );
};

export default UpdateProfileForm;
