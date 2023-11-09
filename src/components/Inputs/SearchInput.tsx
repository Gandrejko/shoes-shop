import {Box, InputBase} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import Image from 'next/image';
import {useId} from 'react';
import {UseFormRegister} from 'react-hook-form';

const styles = {
  search: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '320px',
    borderRadius: '50px',
    border: '1px solid #494949',
    padding: '8px 15px',
    height: '48px',
  },
  searchHuge: {
    width: '100%',
    padding: '15px 25px',
  },
  input: {
    width: '100%',
  },
};

type SearchInputProps = InputBaseProps & {
  register: UseFormRegister<any>;
  validationSchema: any;
  name: string;
};

export const SearchInput = ({
  register,
  name,
  validationSchema,
  ...props
}: SearchInputProps) => {
  const id = useId();
  return (
    <Box sx={styles.search}>
      <Image width={20} height={20} src="icons/search.svg" alt="search" />
      <InputBase
        placeholder="Search"
        id={id}
        sx={styles.input}
        {...props}
        {...register(name, validationSchema)}
      />
    </Box>
  );
};
