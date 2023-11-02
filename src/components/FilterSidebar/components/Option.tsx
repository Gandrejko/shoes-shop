import {Box, InputBase, InputLabel} from '@mui/material';
import {useId} from 'react';

const styles = {
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
};

type OptionProps = {
  name: string;
};

export const Option = ({name}: OptionProps) => {
  const id = useId();
  return (
    <Box sx={styles.option}>
      <InputBase type="checkbox" color="primary" id={id} />
      <InputLabel htmlFor={id}>{name}</InputLabel>
    </Box>
  );
};
