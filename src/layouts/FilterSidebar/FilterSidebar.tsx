import {
  Drawer,
  IconButton,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from '@mui/material';

import useGet from '@/hooks/useGet';
import theme from '@/styles/theme/commonTheme';
import {Category} from './components/Category';

import {BrandsResponse} from '@/types/brand';
import {ColorsResponse} from '@/types/color';
import {GendersResponse} from '@/types/gender';
import {SizesResponse} from '@/types/size';
import Image from 'next/image';
import PriceSlider from './components/PriceSlider';
import {CategoriesResponse} from '@/types/category';

const styles: Record<string, SxProps> = {
  sidebar: {
    '& .MuiDrawer-paper': {
      width: 320,
      height: {md: 'calc(100% - 120px)'},
      marginTop: {md: '120px'},
      border: 'none',
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
  productCount: number;
  onClose: () => void;
};

export const FilterSidebar = ({
  searchingString,
  productCount,
  open,
  onClose,
}: Props) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {data: genders} = useGet<GendersResponse>('/genders');
  const {data: colors} = useGet<ColorsResponse>('/colors');
  const {data: brands} = useGet<BrandsResponse>('/brands');
  const {data: categories} = useGet<CategoriesResponse>('/categories');
  const {data: sizes} = useGet<SizesResponse>('/sizes');

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
            </Typography>
            {searchingString && (
              <Typography>
                {searchingString} ({productCount})
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
