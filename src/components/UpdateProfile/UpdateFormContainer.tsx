import {Box, Button, SxProps} from '@mui/material';
import {UseFormReturn} from 'react-hook-form';
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
  button: {alignSelf: 'flex-end', width: {xs: 117, sm: 152}},
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

type UpdateFormContainerProps = {
  formProps: Pick<
    UseFormReturn<Partial<UserDataType>>,
    'register' | 'control' | 'getValues' | 'setValue' | 'formState'
  >;
};

const UpdateFormContainer = ({formProps}: UpdateFormContainerProps) => {
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
          required
          errorMessage={formProps.formState.errors.firstName?.message}
          style={{marginBottom: '24px'}}
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
          required
          errorMessage={formProps.formState.errors.lastName?.message}
          style={{marginBottom: '24px'}}
        />
        <Input
          placeholder="Email address"
          type="mail"
          labelText="Email"
          name="email"
          register={formProps.register}
          validationSchema={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'This email is invalid',
            },
          }}
          required
          errorMessage={formProps.formState.errors.email?.message}
          style={{marginBottom: '24px'}}
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
          required
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
