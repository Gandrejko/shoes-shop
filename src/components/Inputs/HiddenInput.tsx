import {InputBase, SxProps} from '@mui/material';

const styles: Record<string, SxProps> = {
  input: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  },
};

type InputType = {
  type: string;
  // onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HiddenInput = ({type}: InputType) => {
  return <InputBase type={type} sx={styles.input} />;
};

export default HiddenInput;
