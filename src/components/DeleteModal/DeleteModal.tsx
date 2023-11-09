import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  SxProps,
} from '@mui/material';
import Image from 'next/image';
import {Button} from '../Button/Button';

const styles: Record<string, SxProps> = {
  modalPaper: {
    backgroundColor: 'common.white',
    p: 4,
    gap: {xs: 3, sm: 7},
    borderRadius: 2,
    m: 0,
    maxWidth: {xs: 300, sm: 420, md: 656},
  },
  content: {
    fontWeight: 'fontWeightLight',
    fontSize: 15,
    color: 'text.secondary',
  },
  actions: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: {xs: 22, sm: 32},
    top: {xs: 22, sm: 32},
    aspectRatio: 16 / 16,
  },
};

type DeleteModalProps = {
  isModalOpen: boolean;
  handleModalClose: () => void;
};

const DeleteModal = ({isModalOpen, handleModalClose}: DeleteModalProps) => {
  return (
    <Dialog open={isModalOpen} PaperProps={{sx: styles.modalPaper}}>
      <DialogTitle variant="h1">
        Are you sure to delete selected item?
      </DialogTitle>
      <IconButton
        aria-label="closeModal"
        sx={styles.closeButton}
        onClick={handleModalClose}
      >
        <Image src="icons/modalClose.svg" alt="closeModal" fill />
      </IconButton>
      <DialogContent sx={styles.content}>
        Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi
        massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur.{' '}
      </DialogContent>
      <Divider variant="fullWidth" />
      <DialogActions>
        <Button
          width="282px"
          height="61px"
          isTransparent
          onClick={handleModalClose}
        >
          Cancel
        </Button>
        <Button width="282px" height="61px">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
