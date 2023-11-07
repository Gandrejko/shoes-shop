import {Box, Checkbox, InputLabel} from '@mui/material';
import {useId} from 'react';

const styles = {
  option: {
    display: 'flex',
    alignItems: 'center',
  },
};

type OptionProps = {
  name: string | number;
};

export const Option = ({name}: OptionProps) => {
  const id = useId();
  return (
    <Box sx={styles.option}>
      <Checkbox size="small" color="primary" id={id} />
      <InputLabel htmlFor={id}>{name}</InputLabel>
    </Box>
  );
};
