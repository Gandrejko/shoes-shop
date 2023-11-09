import {Box, InputBase, InputLabel, Typography} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
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
};

type TextareaProps = InputBaseProps & {
  labelText: string;
  register: UseFormRegister<any>;
  validationSchema: RegisterOptions<any>;
  name: string;
};

const Textarea = ({
  labelText,
  register,
  name,
  validationSchema,
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
        sx={styles.textarea}
        id={id}
        fullWidth
        multiline
        {...props}
        {...register(name, validationSchema)}
      />
    </Box>
  );
};

export default Textarea;
