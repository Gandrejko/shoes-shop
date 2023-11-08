import {Grid, SxProps} from '@mui/material';

import useGetRequest from '@/hooks/useGetRequest';
import {ResponseData} from '@/types';
import {ProductAttributes} from '@/types/attributes';
import {Data} from '@/types/entities';
import ProductCard from './ProductCard';

const styles: Record<string, SxProps> = {
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const ProductList = () => {
  const {data: products, isLoading} = useGetRequest<
    any,
    ResponseData<Data<ProductAttributes>[]>
  >({
    endpoint: '/products',
    params: {
      populate: 'images,gender',
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Grid container spacing={{xs: 2, sm: 5, md: 5, lg: 6, xl: 8}}>
      {products?.data.map(product => (
        <Grid key={product.id} item xs={6} lg={4} xl={3} sx={styles.gridItem}>
          <ProductCard product={product.attributes} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductList;
