import {Modal as MuiModal, Box, useTheme, useMediaQuery} from '@mui/material';
import {useForm} from 'react-hook-form';
import {SearchInput} from '../Inputs/SearchInput';
import Image from 'next/image';
import logoIcon from '../../../public/icons/logo.svg';
import modalCloseIcon from '../../../public/icons/modalClose.svg';

const style = {
  container: {
    position: 'absolute' as 'absolute',
    width: '100%',
    backgroundColor: '#FFF',
    padding: {md: '45px 61px 83px 40px', xs: '27px 20px 36px 20px'},
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    maxWidth: '1920px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoImageStyles: {
    marginRight: '25px',
  },
  closeImageStyles: {
    marginLeft: '25px',
  },
};

type ReasonTYpes = 'escapeKeyDown' | 'backdropClick';

type PropsTYpe = {
  handleClose: (value: string) => void;
  isOpen: boolean;
};

export const Modal = ({handleClose, isOpen}: PropsTYpe) => {
  const {register, getValues} = useForm<{searchString: string}>();
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up('md'));

  const handleOnClose = () => {
    handleClose(getValues('searchString'));
  };

  return (
    <>
      <MuiModal
        open={isOpen}
        onClose={handleOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.container}>
          <Box sx={style.wrapper}>
            {greaterThanMid && (
              <Image src={logoIcon} alt="" style={style.logoImageStyles} />
            )}
            <SearchInput
              register={register}
              name="searchString"
              validationSchema={{}}
              giantMode
            />
            <Image
              src={modalCloseIcon}
              alt=""
              style={style.closeImageStyles}
              onClick={handleOnClose}
            />
          </Box>
        </Box>
      </MuiModal>
    </>
  );
};
