import SearchInput from '@/components/common/SearchInput/SearchInput';
import {ProductsResponse} from '@/types';
import buildParams from '@/utils/buildParams';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link as MuiLink,
  SxProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
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
  closeImageStyles: {
    marginLeft: '25px',
    cursor: 'pointer',
    width: 45,
    height: 45,
  },
};

type Props = {
  onSearch: (value: string) => void;
  onClose: () => void;
  isOpen: boolean;
};

export const Modal = ({onSearch, onClose, isOpen}: Props) => {
  const {register, getValues, setValue, watch, setFocus} = useForm<{
    searchingString: string;
  }>();
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up('md'));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const searchingString = watch('searchingString');
  const [suggestions, setSuggestions] = useState<(string | undefined)[]>([]);

  const fetchSuggestions = async () => {
    const searchValue = getValues('searchingString');
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

  const handleOnSearch = () => {
    onSearch(getValues('searchingString'));
  };

  const handleSuggestionClick = (suggestion: string | undefined) => {
    if (suggestion) {
      setValue('searchingString', suggestion);
      onSearch(suggestion);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setFocus('searchingString'), 0);
    }
  }, [isOpen, setFocus]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmedSearchingString = searchingString?.trim() ?? '';
      if (trimmedSearchingString) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchingString]);

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
              <Image
                src={logoIcon}
                alt="logo"
                style={{
                  ...(styles.logoImageStyles as CSSProperties),
                  filter:
                    theme.palette.mode === 'dark'
                      ? 'brightness(1)'
                      : 'brightness(0)',
                }}
              />
            </MuiLink>
            <Box>
              <Box sx={styles.searchbox}>
                <SearchInput
                  register={register}
                  name="searchingString"
                  validationSchema={{}}
                  giantMode
                  enterPressHandler={handleOnSearch}
                  onInputChange={value => {
                    setValue('searchingString', value);
                  }}
                />
                <Button
                  variant="contained"
                  sx={styles.searchBtn}
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

            <IconButton sx={styles.closeImageStyles} onClick={onClose}>
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
      </Drawer>
    </>
  );
};
