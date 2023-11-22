import SearchInput from '@/components/common/SearchInput/SearchInput';
import {ProductsResponse} from '@/types';
import buildParams from '@/utils/buildParams';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link as MuiLink,
  Stack,
  SxProps,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import logoIcon from 'public/icons/logo.svg';
import modalCloseIcon from 'public/icons/modalClose.svg';
import {CSSProperties, useCallback, useEffect, useState} from 'react';
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
    gap: 3,
    backgroundColor: 'background.paper',
    padding: {md: '45px 60px 80px', xs: '25px 30px 50px'},
  },
  searchContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: {xs: 'center', sm: 'flex-start'},
    gap: {xs: 2, sm: 5, md: 7, lg: 15},
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
  suggestionsList: {
    listStyleType: 'none',
    margin: 0,
    paddingLeft: {xs: 0, sm: 10, md: 12, lg: 20},
    paddingRight: {xs: 1, sm: 7, md: 16, lg: 24},
  },
  closeImageStyles: {
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
  const searchingString = watch('searchingString');
  const [suggestions, setSuggestions] = useState<(string | undefined)[]>([]);

  const fetchSuggestions = useCallback(async () => {
    const searchingString = getValues('searchingString');
    const trimmedSearchingString = searchingString?.trim() ?? '';
    if (!trimmedSearchingString) return setSuggestions([]);

    const params = buildParams(
      {searchingString},
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
    const products = response.data;
    const productNames = products.data.map(product => product.attributes.name);
    setSuggestions(productNames);
  }, [getValues]);

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
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchingString, fetchSuggestions]);

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
        <Stack sx={styles.container}>
          <Box sx={styles.searchContainer}>
            <MuiLink
              component={Link}
              href="/products"
              onClick={onClose}
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
            <Box sx={styles.searchbox}>
              <SearchInput
                register={register}
                name="searchingString"
                validationSchema={{}}
                giantMode
                enterPressHandler={handleOnSearch}
                onChange={e => {
                  setValue('searchingString', e.target.value);
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
          <Box component="ul" sx={styles.suggestionsList}>
            {suggestions.map((suggestion, index) => (
              <Box
                key={index}
                component="li"
                style={{marginBottom: '8px', cursor: 'pointer'}}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Box>
            ))}
          </Box>
        </Stack>
      </Drawer>
    </>
  );
};
