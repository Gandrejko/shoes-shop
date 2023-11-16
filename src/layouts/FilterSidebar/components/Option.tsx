import {Box, Checkbox, InputLabel} from '@mui/material';
import {ChangeEvent, useId} from 'react';

const styles = {
  option: {
    display: 'flex',
    alignItems: 'center',
  },
};

type OptionProps = {
  value: string | number;
  checked: boolean;
  onAddFilter: () => void;
  onRemoveFilter: () => void;
};

export const Option = ({
  value,
  checked,
  onAddFilter,
  onRemoveFilter,
}: OptionProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) onAddFilter();
    if (!e.target.checked) onRemoveFilter();
  };

  const id = useId();

  return (
    <Box sx={styles.option}>
      <Checkbox
        size="small"
        color="primary"
        id={id}
        sx={{paddingLeft: 0}}
        checked={checked}
        onChange={handleChange}
      />
      <InputLabel htmlFor={id}>{value}</InputLabel>
    </Box>
  );
};
