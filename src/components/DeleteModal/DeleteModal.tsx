import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  SxProps,
} from '@mui/material';
import {useState} from 'react';
import {Button} from '../Button/Button';
import Image from 'next/image';

const styles: Record<string, SxProps> = {
  modalBox: {
    width: {sx: '320px', md: '656px'},
    height: {sx: '371px', md: '435px'},
    padding: 3,
    gap: {sx: 3, md: 7},
  },
  content: {
    fontWeight: 'fontWeighLight',
    fontSize: 15,
  },
  actions: {
    width: '100%',
    justifyContent: 'space-between',
  },
};

const DeleteModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} sx={styles.modalBox}>
      <DialogTitle component="h1">
        Are you sure to delete selected item
      </DialogTitle>
      <IconButton aria-label="close" onClick={handleClose}>
        <Image
          src="icons/modalClose.svg"
          alt="closeModal"
          width={16}
          height={16}
        />
      </IconButton>
      <DialogContent>
        Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi
        massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur.{' '}
      </DialogContent>
      <Divider variant="fullWidth" />
      <DialogActions>
        <Button width="150px" height="150px" onClick={handleClose}>
          Cancel
        </Button>
        <Button width="150px" height="150px">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
