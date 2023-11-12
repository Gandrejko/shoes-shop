import theme from '@/styles/theme/commonTheme';
import {Box, InputBase, InputLabel, Typography} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import {useId} from 'react';
import {UseFormRegister, RegisterOptions} from 'react-hook-form';
import Image from 'next/image';
import warningIcon from '../../../public/icons/warning.svg';

const styles = {
  requiredMark: {
    color: '#FE645E',
    marginLeft: '5px',
  },
  input: {
    width: '100%',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.grey['A700']}`,
    padding: '8px 15px',
    outline: 'none',
    underline: 'none',
  },
  errorWrapper: {
    color: '#FE645E',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '8px',
  },
};

type InputProps = InputBaseProps & {
  labelText: string;
  register: UseFormRegister<any>;
  validationSchema: RegisterOptions<any>;
  name: string;
  errorMessage?: string;
  required?: boolean;
  marginBottom?: number;
};

export const Input = ({
  labelText,
  register,
  name,
  validationSchema,
  errorMessage,
  required,
  marginBottom,
  ...props
}: InputProps) => {
  const id = useId();
  return (
    <Box sx={{marginBottom: {marginBottom}}}>
      <InputLabel htmlFor={id}>
        {labelText}
        {validationSchema.required && (
          <Typography component="span" sx={styles.requiredMark}>
            *
          </Typography>
        )}
      </InputLabel>
      <InputBase
        id={id}
        sx={styles.input}
        {...props}
        {...register(name, validationSchema)}
        error={!!errorMessage}
      />
      {errorMessage && (
        <Box sx={styles.errorWrapper}>
          <Image src={warningIcon} alt="" />
          {errorMessage}
        </Box>
      )}
    </Box>
  );
};
