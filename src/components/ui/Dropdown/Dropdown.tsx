import theme from '@/config/theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box, InputLabel, MenuItem, Select, SxProps} from '@mui/material';
import {SelectProps} from '@mui/material/Select/Select';
import React, {useId} from 'react';

const styles: Record<string, SxProps> = {
  dropdown: {
    width: '100%',
  },
  select: {
    width: '100%',
    borderRadius: '8px',
    outline: `1px solid ${theme.palette.grey['A400']}`,
    '& .MuiSelect-icon': {
      color: 'text.primary',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      outline: 'none',
    },
    '& .MuiInputBase-root': {
      border: 'none',
      outline: `none`,
    },
  },
};

type DropdownProps = SelectProps & {
  labelText?: string;
  options?: {value: number | string; name: string}[];
  withoutNone?: boolean;
};

const Dropdown = ({
  labelText,
  options = [],
  withoutNone = false,
  ...props
}: DropdownProps) => {
  const id = useId();
  return (
    <Box sx={styles.dropdown}>
      {labelText && <InputLabel htmlFor={id} sx={{color: 'text.secondary'}}>{labelText}</InputLabel>}
      <Select
        id={id}
        IconComponent={ExpandMoreIcon}
        sx={styles.select}
        MenuProps={{sx: {maxHeight: 400}}}
        {...props}
      >
        {!withoutNone && (
          <MenuItem key="none" value={0}>
            None
          </MenuItem>
        )}
        {options.map(({value, name}) => (
          <MenuItem key={value} value={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Dropdown;
