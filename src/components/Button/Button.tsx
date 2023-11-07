import { Button as ButtonMUI, ButtonProps as MUIButtonProps, SxProps } from '@mui/material';

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
  alignSelf?: string;
} & MUIButtonProps; 

export const Button = ({
  isTransparent,
  width = 'auto',
  height = 'auto',
  children,
  ...remainingProps
}: ButtonProps) => {
  const customButtonStyle = isTransparent
    ? styles.transparentButton
    : styles.coloredButton;

  const buttonProps = {
    ...remainingProps, 
    sx: {
      ...remainingProps.sx,
      ...customButtonStyle,
      width,
      height,
    } as SxProps,

  };

  return <ButtonMUI {...buttonProps}>{children}</ButtonMUI>;
};
