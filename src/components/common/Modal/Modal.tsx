import SearchInput from '@/components/common/SearchInput/SearchInput';
import {ProductsResponse} from '@/types';
import buildParams from '@/utils/buildParams';
import {
  Box,
  Button,
  IconButton,
  Modal as MuiModal,
  SxProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import logoIcon from 'public/icons/logo.svg';
import modalCloseIcon from 'public/icons/modalClose.svg';
import {CSSProperties, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

const styles: Record<string, SxProps> = {
  modal: {
    '& .MuiModal-backdrop': {
      backgroundColor: 'grey.A400',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
    '& .MuiBox-root': {
      outline: 'none',
      backgroundColor: 'background.paper',
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
    width: 45,
    height: 45,
  },
};

type PropsType = {
  handleSearchClick: (value: string) => void;
  handleClose: () => void;
  isOpen: boolean;
};

export const Modal = ({handleSearchClick, handleClose, isOpen}: PropsType) => {
  const {register, getValues, setValue, watch} = useForm<{
    searchString: string;
  }>();
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up('md'));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const searchString = watch('searchString');
  const [suggestions, setSuggestions] = useState<(string | undefined)[]>([]);

  const fetchSuggestions = async () => {
    const searchValue = getValues('searchString');
    const params = buildParams(
      {searchingString: searchValue},
      {
        fields: 'name',
        'pagination[page]': 1,
        'pagination[pageSize]': 3,
      },
    );
    const response = await axios.get<ProductsResponse>(
      `${process.env.API_URL}/products`,
      {params},
    );
    const data = response.data;
    const productNames = data.data.map(product => product.attributes.name);
    setSuggestions(productNames);
  };

  const handleOnClose = () => {
    handleClose();
  };

  const handleOnSearch = () => {
    const searchValue = getValues('searchString');
    handleSearchClick(searchValue);
  };

  const handleSuggestionClick = (suggestion: string | undefined) => {
    if (suggestion) {
      setValue('searchString', suggestion);
      handleSearchClick(suggestion);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmedSearchString = searchString?.trim() ?? '';
      if (trimmedSearchString) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchString]);

  return (
    <>
      <MuiModal
        open={isOpen}
        onClose={handleOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={styles.modal}
      >
        <Box sx={styles.container}>
          <Box sx={styles.wrapper}>
            {greaterThanMid && (
              <Image
                src={logoIcon}
                alt=""
                style={{
                  ...(styles.logoImageStyles as CSSProperties),
                  filter:
                    theme.palette.mode === 'dark'
                      ? 'brightness(1)'
                      : 'brightness(0)',
                }}
              />
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '25px',
              }}
            >
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
                  onInputChange={value => {
                    setValue('searchString', value);
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{width: '148px', height: '80px'}}
                  onClick={handleOnSearch}
                >
                  Search
                </Button>
              </Box>
              <Box>
                <ul
                  style={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,
                    paddingLeft: '25px',
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      style={{marginBottom: '8px', cursor: 'pointer'}}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>

            <IconButton sx={styles.closeImageStyles} onClick={handleOnClose}>
              <Image
                src={modalCloseIcon}
                alt=""
                style={{
                  filter:
                    theme.palette.mode === 'dark'
                      ? 'brightness(10)'
                      : 'brightness(1)',
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </MuiModal>
    </>
  );
};
