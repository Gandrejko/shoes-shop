import {
  Drawer,
  IconButton,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from '@mui/material';

import theme from '@/config/theme';
import {Category} from './components/Category';

import {FiltersData} from '@/types';
import Image from 'next/image';
import PriceSlider from './components/PriceSlider';

const styles: Record<string, SxProps> = {
  sidebar: {
    '& .MuiDrawer-paper': {
      width: 320,
      height: {md: 'calc(100% - 120px)'},
      marginTop: {md: '120px'},
      border: 'none',
      overflowX: 'hidden',
    },
    transition: 'width 0.2s ease-in-out',
  },
  header: {
    padding: {xs: '26px 20px', md: '44px 40px 16px'},
  },
};

type Props = {
  open: boolean;
  searchingString: string;
  productsCount: number;
  onClose: () => void;
  filtersData: FiltersData;
};

export const FilterSidebar = ({
  searchingString,
  productsCount,
  open,
  onClose,
  filtersData,
}: Props) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {genders, colors, brands, categories, sizes} = filtersData;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={isMobile ? 'right' : 'left'}
      variant={isMobile ? 'temporary' : 'persistent'}
      sx={{...styles.sidebar, width: open ? 320 : 0}}
    >
      <Stack sx={styles.header}>
        {isMobile ? (
          <IconButton onClick={onClose} sx={{marginLeft: 'auto'}}>
            <Image src="/icons/burgerClose.svg" alt="" width={20} height={20} />
          </IconButton>
        ) : (
          <>
            <Typography>
              Shoes{searchingString ? `/${searchingString}` : ''}
              {searchingString ? '' : ` (${productsCount})`}
            </Typography>
            {searchingString && (
              <Typography>
                {searchingString} ({productsCount})
              </Typography>
            )}
          </>
        )}
      </Stack>
      <Category
        name="Gender"
        options={genders?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category
        name="Color"
        options={colors?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category
        name="Brand"
        options={brands?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category
        name="Categories"
        options={categories?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category name="Price">
        <PriceSlider />
      </Category>
      <Category
        name="Sizes"
        options={sizes?.data.map(({id, attributes}) => ({
          id,
          value: attributes.value!,
        }))}
      />
    </Drawer>
  );
};
