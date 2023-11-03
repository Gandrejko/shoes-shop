import {Grid} from '@mui/material';
import ProductCard from './ProductCard';

const styles = {
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
    <Grid container spacing={{sm: 1, md: 2}}>
      {products.map(product => (
        <Grid
          key={product.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={styles.gridItem}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductList;
