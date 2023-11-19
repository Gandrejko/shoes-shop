import {
  Modal as MuiModal,
  Box,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import {useForm} from 'react-hook-form';
import SearchInput from '@/components/common/SearchInput/SearchInput';
import Image from 'next/image';
import logoIcon from 'public/icons/logo.svg';
import modalCloseIcon from 'public/icons/modalClose.svg';

const style = {
  modal: {
    '& .MuiModal-backdrop': {
      backgroundColor: '#F3F3F3',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
    '& .MuiBox-root': {
      outline: 'none',
    },
  },
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
    cursor: 'pointer',
  },
};

type PropsType = {
  handleSearchClick: (value: string) => void;
  handleClose: () => void;
  isOpen: boolean;
};

export const Modal = ({handleSearchClick, handleClose, isOpen}: PropsType) => {
  const {register, getValues} = useForm<{searchString: string}>();
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up('md'));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOnClose = () => {
    handleClose();
  };

  const handleOnSearch = () => {
    handleSearchClick(getValues('searchString'));
  };

  return (
    <>
      <MuiModal
        open={isOpen}
        onClose={handleOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={style.modal}
      >
        <Box sx={style.container}>
          <Box sx={style.wrapper}>
            {greaterThanMid && (
              <Image src={logoIcon} alt="" style={style.logoImageStyles} />
            )}
            <Box
              sx={{
                width: '100%',
                maxWidth: '1071px',
                display: 'flex',
                flexDirection: `${lessThanSmall ? 'column' : 'row'}`,
                alignItems: 'center',
                gap: '25px',
              }}
            >
              <SearchInput
                register={register}
                name="searchString"
                validationSchema={{}}
                giantMode
                enterPressHandler={handleOnSearch}
              />
              <Button
                variant="outlined"
                sx={{width: '148px', height: '80px'}}
                onClick={handleOnSearch}
              >
                Search
              </Button>
            </Box>

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
