import {Dispatch, SetStateAction, useState} from 'react';
import {Box, Slider, SxProps, Typography} from '@mui/material';

import useGet from '@/hooks/useGet';
import theme from '@/styles/theme/commonTheme';
import {Category} from './components/Category';

import {BrandsResponse} from '@/types/brand';
import {ColorsResponse} from '@/types/color';
import {Filters} from '@/types/data';
import {GendersResponse} from '@/types/gender';
import {SizesResponse} from '@/types/size';

const styles: Record<string, SxProps> = {
  sidebar: {
    width: '320px',
  },
  header: {
    padding: '44px 40px 16px',
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
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export const FilterSidebar = ({setFilters}: Props) => {
  const {data: genders} = useGet<GendersResponse>('/genders');
  const {data: colors} = useGet<ColorsResponse>('/colors');
  const {data: brands} = useGet<BrandsResponse>('/brands');
  const {data: sizes} = useGet<SizesResponse>('/sizes');

  const [price, setPrice] = useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  const searchValue = 'Air Force 1';
  const productCount = 137;

  return (
    <Box sx={styles.sidebar}>
      <Box sx={styles.header}>
        <Typography>Shoes/{searchValue}</Typography>
        <Typography sx={styles.searchValue}>
          {searchValue} ({productCount})
        </Typography>
      </Box>
      <Category
        name="Gender"
        onChangeFilter={genderId => {
          setFilters(prevFilters => ({...prevFilters, gender: genderId}));
        }}
        options={genders?.data.map(({id, attributes}) => ({
          id,
          name: attributes.name!,
        }))}
      />
      <Category
        name="Colors"
        onChangeFilter={colorId =>
          setFilters(prevFilters => ({
            colors: [...prevFilters.colors!, colorId],
          }))
        }
        options={colors?.data.map(({id, attributes}) => ({
          id,
          name: attributes.name!,
        }))}
      />
      <Category
        name="Brands"
        onChangeFilter={brandId => {
          setFilters(prevFilters => ({...prevFilters, brand: brandId}));
        }}
        options={brands?.data.map(({id, attributes}) => ({
          id,
          name: attributes.name!,
        }))}
      />
      <Category name="Price" onChangeFilter={() => {}}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={() => price.toString()}
          sx={styles.slider}
        />
      </Category>
      <Category
        name="Sizes"
        onChangeFilter={sizeId =>
          setFilters(prevFilters => ({
            sizes: [...prevFilters.sizes!, sizeId],
          }))
        }
        options={sizes?.data.map(({id, attributes}) => ({
          id,
          name: attributes.value!,
        }))}
      />
    </Box>
  );
};
