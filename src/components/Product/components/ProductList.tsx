import {Grid, SxProps} from '@mui/material';

import useGet from '@/hooks/useGet';
import {ProductsResponse} from '@/types/product';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

const styles: Record<string, SxProps> = {
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
};

type Props = {
  params?: Record<string, number | string> | null;
  fullWidth?: boolean;
};

const ProductList = ({params = null, fullWidth = false}: Props) => {
  const {data: products, isLoading} = useGet<ProductsResponse>(
    '/products',
    null,
    {
      'filters[teamName]': 'team-3',
      ...params,
    },
  );

  return (
    <Grid
      container
      spacing={{xs: 2, sm: 5, lg: 6, xl: 8}}
      columns={{xs: 12, md: 12, lg: 12, xl: fullWidth ? 10 : 12}}
    >
      {isLoading &&
        new Array(8).fill(0).map((_, index) => (
          <Grid
            key={index}
            item
            xs={6}
            md={fullWidth ? 4 : 6}
            lg={fullWidth ? 3 : 4}
            xl={fullWidth ? 2 : 3}
            sx={styles.gridItem}
          >
            <ProductCardSkeleton />
          </Grid>
        ))}
      {products?.data.map(product => (
        <Grid
          key={product.id}
          item
          xs={6}
          md={fullWidth ? 4 : 6}
          lg={fullWidth ? 3 : 4}
          xl={fullWidth ? 2 : 3}
          sx={styles.gridItem}
        >
          <ProductCard product={{...product.attributes, id: product.id}} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductList;
