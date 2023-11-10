import {InputBase, InputBaseProps, SxProps} from '@mui/material';

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

const HiddenInput = ({...inputProps}: InputBaseProps) => {
  return <InputBase sx={styles.input} {...inputProps} />;
};

export default HiddenInput;
