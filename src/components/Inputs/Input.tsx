import {InputBase, InputLabel, Typography} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import {useId} from 'react';

const styles = {
  label: {},
  requiredMark: {
    color: '#FE645E',
    marginLeft: '5px',
  },
  input: {
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #494949',
    padding: '8px 15px',
    outline: 'none',
    underline: 'none',
  },
};

type InputProps = InputBaseProps & {
  labelText: string;
};

export const Input = ({labelText, ...props}: InputProps) => {
  const id = useId();
  return (
    <>
      <InputLabel sx={styles.label} htmlFor={id}>
        {labelText}
        {props.required && (
          <Typography component="span" sx={styles.requiredMark}>
            *
          </Typography>
        )}
      </InputLabel>
      <InputBase {...props} id={id} sx={styles.input} />
    </>
  );
};
