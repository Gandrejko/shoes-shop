import theme from '@/config/theme';
import {Box, SxProps, Modal, Typography} from '@mui/material';
import React, {useState} from 'react';
import Image from 'next/image';
import {Dispatch, SetStateAction} from 'react';

const styles: Record<string, SxProps> = {
  modal: {
    '& .MuiModal-backdrop': {
      backgroundColor: 'grey.A100',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
  },
  modalContent: {
    padding: '10px',
    gap: 5,
    position: 'relative',
    display: 'flex',
    marginTop: {
      xl: '200px',
      lg: '140px',
      sm: '140px',
      xs: '200px',
    },
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: 900,
    maxHeight: 600,
    marginX: 'auto',
    backgroundColor: 'background.paper',
    width: '80%',
    height: {
      sm: '70%',
      xs: '50%',
    },
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  checkText: {
    textAlign: 'center',
    margin: '0 auto',
  },
  cancelModal: {
    position: 'absolute',
  },
};

const Checkout = ({
  isModalOpen,
  flagCheck,
}: {
  isModalOpen: boolean;
  flagCheck: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      {isModalOpen && (
        <Modal sx={styles.modal} open={isModalOpen}>
          <Box sx={styles.modalContent}>
            <Image width={100} height={100} alt="cart" src="/icons/cart.svg" />
            <Typography component="h2" variant="h1" sx={styles.checkText}>
              Thank you for your purchase.
            </Typography>

            <Image
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                cursor: 'pointer',
              }}
              onClick={() => flagCheck(false)}
              width={24}
              height={24}
              alt="close"
              src="/icons/burgerClose.svg"
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Checkout;
