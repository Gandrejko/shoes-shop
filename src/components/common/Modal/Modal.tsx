import SearchInput from '@/components/common/SearchInput/SearchInput';
import {Box, Button, Drawer, Link as MuiLink, SxProps} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logoIcon from 'public/icons/logo.svg';
import modalCloseIcon from 'public/icons/modalClose.svg';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';

const styles: Record<string, SxProps> = {
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
    display: 'flex',
    backgroundColor: '#FFF',
    padding: {md: '45px 60px 90px', xs: '25px 30px 60px'},
  },
  wrapper: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: {xs: 'center', sm: 'flex-start'},
    gap: {xs: 5, md: 7, lg: 15},
  },
  searchbox: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: {xs: 'column', md: 'row'},
    alignItems: 'center',
    gap: 3,
  },
  searchBtn: {
    width: '150px',
    height: '60px',
    display: {xs: 'none', md: 'block'},
  },
};

type Props = {
  onSearch: (value: string) => void;
  onClose: () => void;
  isOpen: boolean;
};

export const Modal = ({onSearch, onClose, isOpen}: Props) => {
  const {register, getValues, setFocus} = useForm<{searchingString: string}>();

  const handleOnSearch = () => {
    onSearch(getValues('searchingString'));
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setFocus('searchingString'), 0);
    }
  }, [isOpen, setFocus]);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        anchor="top"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={styles.modal}
      >
        <Box sx={styles.container}>
          <Box sx={styles.wrapper}>
            <MuiLink
              component={Link}
              href="/products"
              sx={{display: {xs: 'none', sm: 'block'}}}
            >
              <Image src={logoIcon} alt="logo" />
            </MuiLink>
            <Box sx={styles.searchbox}>
              <SearchInput
                register={register}
                name="searchingString"
                validationSchema={{}}
                giantMode
                enterPressHandler={handleOnSearch}
              />
              <Button
                variant="contained"
                sx={styles.searchBtn}
                onClick={handleOnSearch}
              >
                Search
              </Button>
            </Box>

            <Image
              src={modalCloseIcon}
              alt=""
              style={{cursor: 'pointer'}}
              onClick={onClose}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
