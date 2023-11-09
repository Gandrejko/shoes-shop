import React from 'react';
import {
  Button as ButtonMUI,
  ButtonProps as MUIButtonProps
} from '@mui/material';

const variants = {
  outlined: {
    border: '1px solid #FE645E',
    color: '#FE645E',
    '&:hover': {
      background: '#FE645E',
      color: 'white',
    },
  },
  contained: {
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
  children: React.ReactNode;
  variant: 'outlined' | 'contained';
} & MUIButtonProps;

export const Button = ({
  children,
  variant,
  color,
  ...remainingProps
}: ButtonProps) => {
  const stylesBtn = {
    ...variants[variant],
    ...remainingProps.sx,
  };

  return (
    <ButtonMUI sx={stylesBtn} {...remainingProps}>
      {children}
    </ButtonMUI>
  );
};

