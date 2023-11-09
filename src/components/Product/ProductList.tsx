import {ProductAttributes} from '@/types/attributes';
import {Grid, SxProps} from '@mui/material';
import ProductCard from './ProductCard';

const styles: Record<string, SxProps> = {
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export type Product = ProductAttributes & {
  id: number;
};

type ProductListProps = {
  products: Product[];
};

const ProductList = ({products}: ProductListProps) => {
  return (
    <Grid container spacing={{xs: 2, sm: 5, md: 5, lg: 6, xl: 8}}>
      {products.map(product => (
        <Grid key={product.id} item xs={6} lg={4} xl={3} sx={styles.gridItem}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductList;
