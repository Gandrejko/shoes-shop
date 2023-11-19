import theme from '@/config/theme';
import {Box, InputBase, InputLabel, Typography} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import Image from 'next/image';
import warningIcon from 'public/icons/warning.svg';
import {useId} from 'react';
import {RegisterOptions, UseFormRegister} from 'react-hook-form';

const styles = {
  requiredMark: {
    color: '#FE645E',
    marginLeft: '5px',
  },
  textarea: {
    borderRadius: '8px',
    border: '1px solid #494949',
    padding: '8px 15px',
  },
  errorWrapper: {
    color: '#FE645E',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '8px',
  },
};

type TextareaProps = InputBaseProps & {
  labelText: string;
  register: UseFormRegister<any>;
  validationSchema: RegisterOptions<any>;
  name: string;
  errorMessage?: string;
};

const Textarea = ({
  labelText,
  register,
  name,
  validationSchema,
  errorMessage,
  ...props
}: TextareaProps) => {
  const id = useId();
  return (
    <Box>
      <InputLabel htmlFor={id}>
        {labelText}
        {validationSchema.required && (
          <Typography component="span" sx={styles.requiredMark}>
            *
          </Typography>
        )}
      </InputLabel>
      <InputBase
        sx={{
          ...styles.textarea,
          border: !!errorMessage
            ? `2px solid ${theme.palette.error.main}`
            : `1px solid ${theme.palette.grey['A700']}`,
        }}
        id={id}
        fullWidth
        multiline
        inputProps={{style: {overflowX: 'hidden'}}}
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

export default Textarea;
