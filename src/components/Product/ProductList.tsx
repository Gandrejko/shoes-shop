import {Grid, SxProps} from '@mui/material';
import ProductCard from './ProductCard';

const styles: Record<string, SxProps> = {
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  gender: string;
};

type ProdcutListProps = {
  products: Product[];
};

const ProductList = ({products}: ProdcutListProps) => {
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
