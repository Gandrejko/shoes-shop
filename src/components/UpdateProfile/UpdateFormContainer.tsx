import {UpdateFormType} from '@/pages/settings';
import {Box, Button, SxProps} from '@mui/material';
import {Input} from '../Inputs/Input';

const styles: Record<string, SxProps> = {
  inputsBox: {
    marginBottom: {xs: 4, sm: 7},
  },
  button: {
    alignSelf: 'flex-end',
    width: {xs: 117, sm: 152},
    fontSize: {xs: 12, sm: 16},
  },
};

const UpdateFormContainer = ({formProps}: UpdateFormType) => {
  return (
    <>
      <Box sx={styles.inputsBox}>
        <Input
          placeholder="First Name"
          type="text"
          labelText="Name"
          name="firstName"
          register={formProps.register}
          validationSchema={{
            required: 'Name is required',
          }}
          errorMessage={formProps.formState.errors.firstName?.message}
          marginBottom={24}
        />
        <Input
          placeholder="Last Name"
          type="text"
          labelText="Surname"
          name="lastName"
          register={formProps.register}
          validationSchema={{
            required: 'Surname is required',
          }}
          errorMessage={formProps.formState.errors.lastName?.message}
          marginBottom={24}
        />
        <Input
          placeholder="Email address"
          type="mail"
          labelText="Email"
          name="email"
          disabled
          register={formProps.register}
          validationSchema={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'This email is invalid',
            },
          }}
          errorMessage={formProps.formState.errors.email?.message}
          marginBottom={24}
        />
        <Input
          placeholder="Phone number"
          type="tel"
          labelText="Phone number"
          name="phoneNumber"
          register={formProps.register}
          validationSchema={{
            required: 'Phone number is required',
            pattern: {
              value: /^\(\d{3}\) \d{3}-\d{4}$/,
              message: 'This phone is invalid',
            },
          }}
          errorMessage={formProps.formState.errors.phoneNumber?.message}
        />
      </Box>
      <Button variant="contained" type="submit" sx={styles.button}>
        Save changes
      </Button>
    </>
  );
};

export default UpdateFormContainer;
