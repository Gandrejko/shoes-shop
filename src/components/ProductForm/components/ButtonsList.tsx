import {Box, Button, ButtonProps, SxProps, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction} from 'react';

const styles: Record<string, SxProps> = {
  buttonsList: {
    paddingTop: '1rem',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    fontWeight: 'fontWeighRegular',
    fontSize: {xs: 10, sm: 15},
    textTransform: 'uppercase',
    borderColor: 'grey.A700',
    color: 'text.secondary',
    padding: {xs: '8px 15px', sm: '10px 20px'},
    '&:hover': {
      borderColor: 'grey.A700',
      backgroundColor: 'grey.A100',
    },
  },
};

type ButtonsListProps = {
  data: {
    id: number;
    name: string;
  }[];
  setChoosedData: Dispatch<SetStateAction<number[]>>;
  choosedData: number[];
  disabled?: boolean;
  namePrefix?: string;
  header: string;
};

const ButtonsList = ({
  data,
  choosedData,
  setChoosedData,
  disabled,
  namePrefix,
  header,
}: ButtonsListProps) => {
  const checkButton = (id: number, isChecked: boolean) => {
    setChoosedData(prevState => {
      if (!isChecked) {
        return [...prevState, id];
      } else {
        return prevState.filter((buttonId: number) => buttonId !== id);
      }
    });
  };
  return (
    <Box>
      <Typography>{header}</Typography>
      <Box sx={styles.buttonsList}>
        {data.map(({id, name}) => {
          const isChecked = Boolean(
            choosedData.find((categoryId: number) => categoryId === id),
          );
          return (
            <Button
              key={id}
              sx={{
                ...styles.button,
                color: isChecked ? 'white' : 'text.secondary',
              }}
              variant={isChecked ? 'contained' : 'outlined'}
              onClick={() => checkButton(id, isChecked)}
              disabled={disabled}
            >
              {namePrefix}
              {name}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default ButtonsList;
