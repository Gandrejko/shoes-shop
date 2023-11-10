import {Box, Checkbox, InputLabel} from '@mui/material';
import {useId} from 'react';

const styles = {
  option: {
    display: 'flex',
    alignItems: 'center',
  },
};

type OptionProps = {
  id: number;
  name: string | number;
  onChangeFilter: (id: number) => void;
};

export const Option = ({name, onChangeFilter}: OptionProps) => {
  const id = useId();
  return (
    <Box sx={styles.option}>
      <Checkbox size="small" color="primary" id={id} sx={{paddingLeft: 0}} />
      <InputLabel htmlFor={id}>{name}</InputLabel>
    </Box>
  );
};
