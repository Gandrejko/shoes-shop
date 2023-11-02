import {
  BrandsResponse,
  ColorsResponse,
  Data,
  GendersResponse,
  SizesResponse,
} from '@/types';
import {Box} from '@mui/material';
import axios, {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import {Category} from './components/Category';

const styles = {
  sidebar: {
    width: '320px',
  },
};

type CategoryInfo = {
  id: number;
  name: string;
};

export const FilterSidebar = () => {
  const {data: genders} = useQuery<AxiosResponse<GendersResponse>>(
    'genders',
    () => axios.get(`${process.env.API_URL}/genders`),
  );
  const {data: colors} = useQuery<AxiosResponse<BrandsResponse>>('colors', () =>
    axios.get(`${process.env.API_URL}/colors`),
  );
  const {data: brands} = useQuery<AxiosResponse<ColorsResponse>>('brands', () =>
    axios.get(`${process.env.API_URL}/brands`),
  );
  const {data: sizes} = useQuery<AxiosResponse<SizesResponse>>('sizes', () =>
    axios.get(`${process.env.API_URL}/sizes`),
  );

  return (
    <Box sx={styles.sidebar}>
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
