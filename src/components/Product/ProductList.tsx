import {Grid, SxProps} from '@mui/material';

import useGet from '@/hooks/useGet';
import {ProductsResponse} from '@/types/product';
import ProductCard from './ProductCard';

const styles: Record<string, SxProps> = {
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
};

type Props = {
  params?: any;
};

const ProductList = ({params = null}: Props) => {
  const {data: products, isLoading} = useGet<ProductsResponse>(
    '/products',
    null,
    {
      populate: 'images,gender',
      'filters[teamName]': 'team-3',
      ...params,
    },
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <Grid container spacing={{xs: 2, sm: 5, md: 5, lg: 6, xl: 8}}>
      {products?.data.map(product => (
        <Grid key={product.id} item xs={6} lg={4} xl={3} sx={styles.gridItem}>
          <ProductCard product={{...product.attributes, id: product.id}} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductList;
