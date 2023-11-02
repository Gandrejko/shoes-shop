import { Button } from '@mui/material';

const styles = {
  transparentButton: {
    border: '1px solid #FE645E',
    color: '#FE645E',
    '&:hover': {
      background: '#FE645E',
      color: 'white',
    },
  },
  coloredButton: {
    background: '#FE645E',
    color: 'white',
    '&:hover': {
      background: 'none',
      color: '#FE645E',
      border: '1px solid #FE645E',
    },
  },
};

type ButtonProps = {
  isTransparent?: boolean;
  width?: string;
  height?: string; 
  children: React.ReactNode;
};

export const CustomButton = ({ isTransparent, width, height, children }: ButtonProps) => {
  const buttonStyle = isTransparent ? styles.transparentButton : styles.coloredButton;

  const buttonProps = {
    sx: {
      width: width || 'auto',
      height: height || 'auto', 
      ...buttonStyle,
    },
  };

  return (
    <Button {...buttonProps}>
      {children}
    </Button>
  );
};
