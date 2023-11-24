import {FiltersData} from '@/types';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
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
      backgroundColor: 'grey.A100',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
    zIndex: (theme: Theme) => ({md: theme.zIndex.appBar - 1})!,
    transition: 'width 0.2s ease-in-out',
  },
  header: {
    flexDirection: {xs: 'row-reverse', md: 'column'},
    justifyContent: 'space-between',
    gap: 3,
    padding: {xs: '26px 20px', md: '44px 40px 16px 0'},
    paddingLeft: {xs: 5},
    backgroundColor: 'background.paper',
  },
};

type Props = {
  open: boolean;
  isMobile: boolean;
  searchingString: string;
  productsCount: number;
  filtersData: FiltersData;
  onClose: () => void;
};

export const FilterSidebar = ({
  open,
  isMobile,
  searchingString,
  productsCount,
  filtersData,
  onClose,
}: Props) => {
  const router = useRouter();
  const theme = useTheme();

  const {genders, colors, brands, categories, sizes} = filtersData;

  const handleClearFilters = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      {shallow: true},
    );
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      {/* Desktop */}
      <Drawer
        open={open}
        onClose={onClose}
        anchor={isMobile ? 'right' : 'left'}
        variant={isMobile ? 'temporary' : 'persistent'}
        sx={{
          ...styles.sidebar,
          width: open ? 370 : 0,
          display: isMobile ? {md: 'none'} : {xs: 'none', md: 'block'},
        }}
      >
        <Stack sx={styles.header}>
          {isMobile ? (
            <IconButton onClick={onClose} sx={{display: {md: 'none'}}}>
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
            <Box>
              <Typography>
                {searchingString
                  ? `Searching results for: ${searchingString}`
                  : 'Shoes'}
              </Typography>
              <Typography>
                {searchingString && `Products found - ${productsCount}`}
              </Typography>
            </Box>
          )}
          <Button onClick={handleClearFilters} variant="outlined">
            Clear filters
          </Button>
        </Stack>

        {/* Categories */}
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
    </>
  );
};
