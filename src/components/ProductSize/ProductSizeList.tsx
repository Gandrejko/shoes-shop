import {Box, SxProps, Typography} from '@mui/material';
import ProductSizeItem from './ProductSizeItem';

const styles: Record<string, SxProps> = {
  box: {width: '500px'},
  header: {
    fontSize: 20,
    color: 'grey.A700',
    marginBottom: {xs: '5px', sm: 3},
  },
  sizesBox: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: {xs: 2, sm: 3},
  },
};

type SizeItemType = {
  id: number;
  value: number;
};

type ProdcutListProps = {
  sizes: SizeItemType[];
  header: string;
};

const ProductSizeList = ({sizes, header}: ProdcutListProps) => {
  return (
    <Box sx={styles.box}>
      <Typography sx={styles.header}>{header}</Typography>
      {/* Think this typography should be h4. If yes, I can add h4 config to the theme and here use I can set like component='h4'*/}
      <Box sx={styles.sizesBox}>
        {sizes.map(size => (
          <ProductSizeItem key={size.id} size={size} />
        ))}
      </Box>
    </Box>
  );
};

export default ProductSizeList;
