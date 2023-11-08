import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import {useState} from 'react';
import {Button} from '../Button/Button';

const DeleteModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open}>
      <DialogTitle component="h1">
        Are you sure to delete selected item
      </DialogTitle>
      <IconButton aria-label="close" />
      <DialogContent>
        Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi
        massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur.{' '}
      </DialogContent>
      <DialogActions>
        <Button width="150px" height="150px">
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
