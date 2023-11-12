import {Box, SxProps, Typography} from '@mui/material';
import {Controller, UseFormReturn} from 'react-hook-form';
import ProductSizeItem from './ProductSizeItem';
import {ProductRequest} from '@/types/product';
import {Size} from '@/types/size';

const styles: Record<string, SxProps> = {
  box: {width: '100%'},
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

type ProductListProps = {
  header: string;
  onClick: (id: number) => void;
  sizes: Size[];
  choosedSizes: {
    id: number;
    value: number;
  }[];
};

const ProductSizeList = ({
  header,
  onClick,
  sizes,
  choosedSizes,
}: ProductListProps) => {
  return (
    <Box sx={styles.box}>
      <Typography sx={styles.header}>{header}</Typography>
      {/* Think this typography should be h4. If yes, I can add h4 config to the theme and here use I can set like component='h4'*/}
      <Box sx={styles.sizesBox}>
        {sizes.map(({id, value}) => (
          <ProductSizeItem
            isChecked={Boolean(
              choosedSizes.find((size: any) => size.id === id),
            )}
            key={id}
            size={{id, value}}
            onClick={onClick}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductSizeList;
