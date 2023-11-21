import theme from '@/config/theme';
import {Box, InputBase, InputLabel, SxProps, Typography} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import {useId, useState} from 'react';
import {UseFormRegister, RegisterOptions} from 'react-hook-form';
import Image from 'next/image';
import warningIcon from 'public/icons/warning.svg';
import eyeIcon from 'public/icons/eye.svg';
import eyeSlashIcon from 'public/icons/eyeSlash.svg';

const styles = {
  inputContainer: {
    position: 'relative',
  },
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
  togglePassword: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    display: 'flex',
    alignItems: 'center',
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
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  return (
    <Box sx={boxSx}>
      <InputLabel htmlFor={id}>
        {labelText}
        {validationSchema.required && (
          <Typography component="span" sx={styles.requiredMark}>
            *
          </Typography>
        )}
      </InputLabel>
      <Box sx={styles.inputContainer}>
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
          type={props.type === 'password' && showPassword ? 'text' : props.type}
        />
        {props.type === 'password' && (
          <Box sx={styles.togglePassword}>
            <Image
              onClick={() => setShowPassword(!showPassword)}
              style={{cursor: 'pointer'}}
              src={showPassword ? eyeSlashIcon : eyeIcon}
              alt="eye"
              width={20}
              height={20}
            />
          </Box>
        )}
      </Box>
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
