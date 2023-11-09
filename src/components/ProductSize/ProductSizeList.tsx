import {ProductData} from '@/components/ProductForm/ProductForm';
import {Box, SxProps, Typography} from '@mui/material';
import React from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import ProductSizeItem from './ProductSizeItem';

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

type SizeItemType = {
  id: number;
  value: number;
};

type ProductListProps = {
  header: string;
  control: UseFormReturn<ProductData>['control'];
  onClick: (id: number, isChecked: boolean) => void;
  sizes: SizeItemType[];
};

const ProductSizeList = ({
  header,
  control,
  onClick,
  sizes,
}: ProductListProps) => {
  return (
    <Box sx={styles.box}>
      <Typography sx={styles.header}>{header}</Typography>
      {/* Think this typography should be h4. If yes, I can add h4 config to the theme and here use I can set like component='h4'*/}
      <Box sx={styles.sizesBox}>
        <Controller
          name="sizes"
          control={control}
          render={({field}) => (
            <>
              {sizes.map(({id, value}) => (
                <ProductSizeItem
                  key={id}
                  size={{id, value}}
                  onClick={onClick}
                />
              ))}
            </>
          )}
        />
      </Box>
    </Box>
  );
};

export default ProductSizeList;
