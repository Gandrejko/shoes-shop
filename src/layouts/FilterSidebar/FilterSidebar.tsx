import {Dispatch, SetStateAction, useState} from 'react';
import {
  Drawer,
  IconButton,
  Slider,
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
import {Filters} from '@/types/data';
import {GendersResponse} from '@/types/gender';
import {SizesResponse} from '@/types/size';
import Image from 'next/image';

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
  slider: {
    marginTop: '25px',
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 16,
      width: 16,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: theme.palette.primary.main,
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': {display: 'none'},
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
    '& .MuiSlider-rail': {
      color: theme.palette.grey['A200'],
    },
  },
};

type Props = {
  open: boolean;
  filters: Filters;
  searchText: string;
  productCount: number;
  onClose: () => void;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export const FilterSidebar = ({
  filters,
  setFilters,
  open,
  onClose,
  searchText,
  productCount,
}: Props) => {
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.minPrice,
    filters.maxPrice,
  ]);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {data: genders} = useGet<GendersResponse>('/genders');
  const {data: colors} = useGet<ColorsResponse>('/colors');
  const {data: brands} = useGet<BrandsResponse>('/brands');
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
            <Typography>Shoes/{searchText}</Typography>
            <Typography sx={styles.searchText}>
              {searchText} ({productCount})
            </Typography>
          </>
        )}
      </Stack>
      <Category
        name="Gender"
        checkedIds={filters.gender}
        onAddFilter={genderId => {
          setFilters(prevFilters => ({
            ...prevFilters,
            gender: [...prevFilters.gender, genderId],
          }));
        }}
        onRemoveFilter={genderId => {
          setFilters(prevFilters => ({
            ...prevFilters,
            gender: prevFilters.gender.filter(id => id !== genderId),
          }));
        }}
        options={genders?.data.map(({id, attributes}) => ({
          id,
          name: attributes.name!,
        }))}
      />
      <Category
        name="Colors"
        checkedIds={filters.color}
        onAddFilter={colorId => {
          setFilters(prevFilters => ({
            ...prevFilters,
            color: [...prevFilters.color, colorId],
          }));
        }}
        onRemoveFilter={colorId => {
          setFilters(prevFilters => ({
            ...prevFilters,
            color: prevFilters.color.filter(id => id !== colorId),
          }));
        }}
        options={colors?.data.map(({id, attributes}) => ({
          id,
          name: attributes.name!,
        }))}
      />
      <Category
        name="Brands"
        checkedIds={filters.brand}
        onAddFilter={brandId => {
          setFilters(prevFilters => ({
            ...prevFilters,
            brand: [...prevFilters.brand, brandId],
          }));
        }}
        onRemoveFilter={brandId => {
          setFilters(prevFilters => ({
            ...prevFilters,
            brand: prevFilters.brand.filter(id => id !== brandId),
          }));
        }}
        options={brands?.data.map(({id, attributes}) => ({
          id,
          name: attributes.name!,
        }))}
      />
      <Category name="Price">
        <Slider
          max={1000}
          value={priceRange}
          onChange={(_, value) => setPriceRange(value as number[])}
          onChangeCommitted={(_, value) => {
            setFilters(prevFilters => ({
              ...prevFilters,
              minPrice: (value as number[])[0],
              maxPrice: (value as number[])[1],
            }));
          }}
          valueLabelFormat={value => `$${value}`}
          valueLabelDisplay="auto"
          getAriaLabel={() => 'Price range'}
          getAriaValueText={() =>
            [filters.minPrice, filters.maxPrice].toString()
          }
          sx={styles.slider}
        />
      </Category>
      <Category
        name="Sizes"
        checkedIds={filters.sizes}
        onAddFilter={sizeId => {
          setFilters(prevFilters => ({
            ...prevFilters,
            sizes: [...prevFilters.sizes!, sizeId],
          }));
        }}
        onRemoveFilter={sizeId => {
          setFilters(prevFilters => ({
            ...prevFilters,
            sizes: prevFilters.sizes!.filter(id => id !== sizeId),
          }));
        }}
        options={sizes?.data.map(({id, attributes}) => ({
          id,
          name: attributes.value!,
        }))}
      />
    </Drawer>
  );
};
