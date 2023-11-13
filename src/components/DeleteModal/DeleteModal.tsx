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
    maxWidth: {xs: '88%', sm: '65%', md: '55%', lg: '50%', xl: '34%'},
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
  modalHeader: string;
  modalDescr: string;
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleDelete: () => void;
};

const DeleteModal = ({
  modalDescr,
  modalHeader,
  isModalOpen,
  handleModalClose,
  handleDelete,
}: DeleteModalProps) => {
  return (
    <Dialog open={true} PaperProps={{sx: styles.modalPaper}}>
      <DialogTitle variant="h1" sx={styles.title}>
        {modalHeader}
      </DialogTitle>
      <IconButton
        aria-label="closeModal"
        sx={styles.closeButton}
        onClick={handleModalClose}
      >
        <Image src="icons/modalClose.svg" alt="close modal" fill sizes="100%" />
      </IconButton>
      <DialogContent sx={styles.content}>
        <Typography variant="body1" sx={styles.descr}>
          {modalDescr}
        </Typography>
      </DialogContent>
      <Divider variant="fullWidth" />
      <DialogActions sx={styles.actions}>
        <Button
          variant="outlined"
          sx={styles.button}
          onClick={handleModalClose}
        >
          Cancel
        </Button>
        <Button variant="contained" sx={styles.button} onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
