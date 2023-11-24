import {Box, Checkbox, InputLabel, SxProps} from '@mui/material';
import {ChangeEvent, useId} from 'react';

const styles: Record<string, SxProps> = {
  option: {
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    '& .MuiCheckbox-root, & .MuiInputLabel-root': {
      color: 'inherit',
    },
  },
  checkbox: {
    marginLeft: -1,
    '&:hover': {
      backgroundColor: 'transparent',
    },
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
        sx={styles.checkbox}
        checked={checked}
        onChange={handleChange}
      />
      <InputLabel htmlFor={id} sx={{marginBottom: 0}}>
        {value}
      </InputLabel>
    </Box>
  );
};
