import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  SxProps,
  Typography,
} from '@mui/material';
import Image from 'next/image';

const styles: Record<string, SxProps> = {
  modalPaper: {
    m: 0,
    p: 4,
    gap: {xs: 3, sm: 7},
    borderRadius: 2,
    boxShadow: 'none',
    backgroundColor: 'common.white',
    maxWidth: 600,
    margin: 4,
  },
  title: {p: 0},
  content: {
    // fontSize: 15,
    p: 0,
  },
  descr: {fontWeight: 'fontWeightLight', color: 'text.secondary'},
  actions: {
    p: 0,
    justifyContent: 'space-between',
    gap: {xs: 1.5, md: 3.75},
    width: '100%',
  },
  button: {width: {xs: 122, md: 281}, height: {xs: 40, md: 61}},
  closeButton: {
    position: 'absolute',
    right: '4%',
    top: '8%',
    width: 16,
    height: 16,
  },
};

type DeleteModalProps = {
  header: string;
  description: string;
  isModalOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModal = ({
  description,
  header,
  isModalOpen,
  onClose,
  onDelete,
}: DeleteModalProps) => {
  return (
    <Dialog open={isModalOpen} PaperProps={{sx: styles.modalPaper}}>
      <DialogTitle variant="h1" sx={styles.title}>
        {header}
      </DialogTitle>
      <IconButton
        aria-label="closeModal"
        sx={styles.closeButton}
        onClick={onClose}
      >
        <Image src="icons/modalClose.svg" alt="close modal" fill sizes="100%" />
      </IconButton>
      <DialogContent sx={styles.content}>
        <Typography variant="body1" sx={styles.descr}>
          {description}
        </Typography>
      </DialogContent>
      <Divider variant="fullWidth" />
      <DialogActions sx={styles.actions}>
        <Button
          variant="outlined"
          sx={{width: '282px', height: '61px'}}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{width: '282px', height: '61px'}}
          onClick={onDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
