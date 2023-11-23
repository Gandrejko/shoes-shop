import {
  Drawer,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {FiltersData} from '@/types';
import Image from 'next/image';
import {Category} from './components/Category';
import PriceSlider from './components/PriceSlider';

const styles: Record<string, SxProps<Theme>> = {
  sidebar: {
    '&.MuiDrawer-root': {
      position: 'relative',
    },
    '& .MuiDrawer-paper': {
      position: {md: 'sticky'},
      width: 350,
      height: {md: 'calc(100vh - 120px)'},
      paddingLeft: {md: 4},
      border: 'none',
      overflowX: 'hidden',
      backgroundImage: 'none',
    },
    '& .MuiModal-backdrop': {
      backgroundColor: 'grey.A400',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
    zIndex: (theme: Theme) => ({md: theme.zIndex.appBar - 1})!,
    transition: 'width 0.2s ease-in-out',
  },
  header: {
    padding: {xs: '26px 20px', md: '44px 40px 16px 0'},
    backgroundColor: 'background.paper',
  },
};

type Props = {
  open: boolean;
  searchingString: string;
  productsCount: number;
  filtersData: FiltersData;
  onClose: () => void;
};

export const FilterSidebar = ({
  searchingString,
  productsCount,
  open,
  onClose,
  filtersData,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {noSsr: true});

  const {genders, colors, brands, categories, sizes} = filtersData;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={isMobile ? 'right' : 'left'}
      variant={isMobile ? 'temporary' : 'persistent'}
      sx={{...styles.sidebar, width: open ? 350 : 0}}
    >
      <Stack sx={styles.header}>
        {isMobile ? (
          <IconButton onClick={onClose} sx={{marginLeft: 'auto'}}>
            <Image
              src="/icons/burgerClose.svg"
              alt=""
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
