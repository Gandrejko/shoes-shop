import {Data, ResponseData} from '@/types';
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

const getData = (data: Data[]): CategoryInfo[] => {
  return data.map(({id, attributes}) => ({
    id,
    name: attributes.name,
  }));
};

export const FilterSidebar = () => {
  const {data: genders} = useQuery<AxiosResponse<ResponseData>>('genders', () =>
    axios.get(`${process.env.API_URL}/genders`),
  );
  const {data: colors} = useQuery<AxiosResponse<ResponseData>>('colors', () =>
    axios.get(`${process.env.API_URL}/colors`),
  );
  const {data: brands} = useQuery<AxiosResponse<ResponseData>>('brands', () =>
    axios.get(`${process.env.API_URL}/brands`),
  );
  return (
    <Box sx={styles.sidebar}>
      <Category name="Gender" options={getData(genders?.data.data || [])} />
      <Category name="Colors" options={getData(colors?.data.data || [])} />
      <Category name="Brands" options={getData(brands?.data.data || [])} />
    </Box>
  );
};
