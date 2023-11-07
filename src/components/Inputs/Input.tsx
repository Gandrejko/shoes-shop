import theme from '@/styles/theme/commonTheme';
import {Box, InputBase, InputLabel, Typography} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import {useId} from 'react';
import {UseFormRegister} from 'react-hook-form';

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
};

type InputProps = InputBaseProps & {
  labelText: string;
  register: UseFormRegister<any>;
  validationSchema: any;
  name: string;
};

export const Input = ({
  labelText,
  register,
  name,
  validationSchema,
  ...props
}: InputProps) => {
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
        sx={styles.input}
        {...props}
        {...register(name, validationSchema)}
      />
    </Box>
  );
};
