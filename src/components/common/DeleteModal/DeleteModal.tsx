import ColorModeContext from '@/config/theme/ColorModeContext';
import {
  Button,
  CircularProgress,
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
import {useContext} from 'react';

const styles: Record<string, SxProps> = {
  modal: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'grey.A100',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
  },
  modalPaper: {
    m: 0,
    p: 4,
    gap: {xs: 3, sm: 7},
    borderRadius: 2,
    boxShadow: 'none',
    backgroundColor: 'background.paper',
    maxWidth: 600,
    margin: 4,
  },
  title: {p: 0},
  content: {
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
    width: 45,
    height: 45,
    borderRadius: '50%',
  },
};

type DeleteModalProps = {
  header: string;
  description: string;
  isModalOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
};

const DeleteModal = ({
  description,
  header,
  isModalOpen,
  onClose,
  onDelete,
  isDeleting,
}: DeleteModalProps) => {
  const {theme} = useContext(ColorModeContext);

  return (
    <Dialog
      open={isModalOpen}
      sx={styles.modal}
      PaperProps={{sx: styles.modalPaper}}
    >
      <DialogTitle variant="h1" sx={styles.title}>
        {header}
      </DialogTitle>
      <IconButton
        aria-label="closeModal"
        sx={styles.closeButton}
        onClick={onClose}
      >
        <Image
          src="/icons/modalClose.svg"
          alt="close modal"
          width={20}
          height={20}
          style={{
            filter:
              theme.palette.mode === 'dark'
                ? 'brightness(10)'
                : 'brightness(1)',
          }}
        />
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
          sx={styles.button}
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={onDelete}
          disabled={isDeleting}
          endIcon={isDeleting && <CircularProgress size={15} />}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
