import theme from '@/styles/theme/commonTheme';
import {
  BrandsResponse,
  ColorsResponse,
  Data,
  GendersResponse,
  SizesResponse,
} from '@/types';
import {Box, Slider, SxProps, Typography} from '@mui/material';
import axios, {AxiosResponse} from 'axios';
import {useQuery} from '@tanstack/react-query';
import {Category} from './components/Category';
import {useState} from 'react';

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

type CategoryInfo = {
  id: number;
  name: string;
};

export const FilterSidebar = () => {
  const {data: genders} = useQuery<AxiosResponse<GendersResponse>>({
    queryKey: ['genders'],
    queryFn: () => axios.get(`${process.env.API_URL}/genders`),
  });
  const {data: colors} = useQuery<AxiosResponse<ColorsResponse>>({
    queryKey: ['colors'],
    queryFn: () => axios.get(`${process.env.API_URL}/colors`),
  });
  const {data: brands} = useQuery<AxiosResponse<BrandsResponse>>({
    queryKey: ['brands'],
    queryFn: () => axios.get(`${process.env.API_URL}/brands`),
  });
  const {data: sizes} = useQuery<AxiosResponse<SizesResponse>>({
    queryKey: ['sizes'],
    queryFn: () => axios.get(`${process.env.API_URL}/sizes`),
  });

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
        options={genders?.data.data.map(({id, attributes}) => ({
          id,
          name: attributes.name,
        }))}
      />
      <Category
        name="Colors"
        options={colors?.data.data.map(({id, attributes}) => ({
          id,
          name: attributes.name,
        }))}
      />
      <Category
        name="Brands"
        options={brands?.data.data.map(({id, attributes}) => ({
          id,
          name: attributes.name,
        }))}
      />
      <Category name="Price">
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
        options={sizes?.data.data.map(({id, attributes}) => ({
          id,
          name: attributes.value,
        }))}
      />
    </Box>
  );
};
