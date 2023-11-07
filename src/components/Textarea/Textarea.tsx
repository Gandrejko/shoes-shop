import {Box, InputBase, InputLabel, Typography} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import {useId} from 'react';
import {UseFormRegister} from 'react-hook-form';

const styles = {
  requiredMark: {
    color: '#FE645E',
    marginLeft: '5px',
  },
};

type TextareaProps = InputBaseProps & {
  labelText: string;
  register: UseFormRegister<any>;
  validationSchema: any;
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
