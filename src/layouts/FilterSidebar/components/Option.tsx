import {Box, Checkbox, InputLabel} from '@mui/material';
import {ChangeEvent, useId} from 'react';

const styles = {
  option: {
    display: 'flex',
    alignItems: 'center',
  },
};

type OptionProps = {
  id: number;
  name: string | number;
  onAddFilter: (id: number) => void;
  onRemoveFilter: (id: number) => void;
};

export const Option = ({
  id,
  name,
  onAddFilter,
  onRemoveFilter,
}: OptionProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) onAddFilter(id);
    if (!e.target.checked) onRemoveFilter(id);
  };

  return (
    <Box sx={styles.option}>
      <Checkbox
        size="small"
        color="primary"
        id={String(id)}
        sx={{paddingLeft: 0}}
        onChange={handleChange}
      />
      <InputLabel htmlFor={String(id)}>{name}</InputLabel>
    </Box>
  );
};
