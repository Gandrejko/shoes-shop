import {
  BrandsResponse,
  ColorsResponse,
  Data,
  GendersResponse,
  SizesResponse,
} from '@/types';
import {Box} from '@mui/material';
import axios, {AxiosResponse} from 'axios';
import {useQuery} from '@tanstack/react-query';
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
