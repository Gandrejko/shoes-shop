import theme from '@/config/theme';
import {Box, InputBase, InputLabel, SxProps, Typography} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import {useId} from 'react';
import {UseFormRegister, RegisterOptions} from 'react-hook-form';
import Image from 'next/image';
import warningIcon from 'public/icons/warning.svg';

const styles: Record<string, SxProps> = {
  requiredMark: {
    color: 'primary.main',
    marginLeft: '5px',
  },
  input: {
    width: '100%',
    borderRadius: '8px',
    padding: '8px 15px',
    outline: 'none',
    underline: 'none',
    '& .MuiInputBase-input': {
      color: 'text.primary',
    },
    '& .Mui-disabled': {
      color: 'grey.A200',
      WebkitTextFillColor: 'unset',
    },
  },
  errorWrapper: {
    color: 'error.main',
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
  boxSx?: SxProps;
};

const Input = ({
  labelText,
  register,
  name,
  validationSchema,
  errorMessage,
  boxSx,
  ...props
}: InputProps) => {
  const id = useId();
  return (
    <Box sx={boxSx}>
      <InputLabel htmlFor={id} sx={{color: 'text.secondary'}}>
        {labelText}
        {validationSchema.required && (
          <Typography component="span" sx={styles.requiredMark}>
            *
          </Typography>
        )}
      </InputLabel>
      <InputBase
        id={id}
        sx={{
          ...styles.input,
          border: !!errorMessage
            ? `2px solid ${theme.palette.error.main}`
            : `1px solid ${theme.palette.grey['A700']}`,
        }}
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

export default Input;
