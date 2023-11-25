import {Box, Button, CircularProgress, SxProps} from '@mui/material';
import {useContext} from 'react';
import Input from '@/components/ui/Input/Input';
import {UpdateFormContext} from './UpdateForm';

const styles: Record<string, SxProps> = {
  input: {mb: 2},
  inputsBox: {
    mb: 2,
  },
  button: {
    alignSelf: 'flex-end',
    width: {xs: 117, sm: 152},
    fontSize: {xs: 12, sm: 16},
    '&.Mui-disabled': {
      color: 'primary.main',
      backgroundColor: 'transparent',
      opacity: 0.85,
    },
  },
};

const UpdateFormContainer = () => {
  const {isUserDataLoading, isUploadImageLoading, register, formState} =
    useContext(UpdateFormContext);

  return (
    <>
      <Box sx={styles.inputsBox}>
        <Input
          placeholder="First Name"
          type="text"
          labelText="Name"
          name="firstName"
          disabled={isUserDataLoading}
          register={register}
          validationSchema={{}}
          errorMessage={formState.errors.firstName?.message}
          boxSx={styles.input}
        />
        <Input
          placeholder="Last Name"
          type="text"
          labelText="Surname"
          name="lastName"
          disabled={isUserDataLoading}
          register={register}
          validationSchema={{}}
          errorMessage={formState.errors.lastName?.message}
          boxSx={styles.input}
        />
        <Input
          placeholder="Email address"
          type="mail"
          labelText="Email"
          name="email"
          disabled
          register={register}
          validationSchema={{}}
          errorMessage={formState.errors.email?.message}
          boxSx={styles.input}
        />
        <Input
          placeholder="Phone number"
          type="tel"
          labelText="Phone number"
          name="phoneNumber"
          disabled={isUserDataLoading}
          register={register}
          validationSchema={{
            pattern: {
              value: /^\(\d{3}\) \d{3}-\d{4}$/,
              message: 'Enter phone number in the format (949) 354-2574',
            },
          }}
          errorMessage={formState.errors.phoneNumber?.message}
        />
      </Box>
      <Button
        variant="contained"
        type="submit"
        sx={styles.button}
        disabled={isUserDataLoading || isUploadImageLoading}
        endIcon={isUserDataLoading && <CircularProgress size={15} />}
      >
        {isUserDataLoading ? 'Saving...' : 'Save changes'}
      </Button>
    </>
  );
};

export default UpdateFormContainer;
