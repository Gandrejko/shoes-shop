import {Button, SxProps} from '@mui/material';

const styles: Record<string, SxProps> = {
  button: {
    fontWeight: 'fontWeighRegular',
    fontSize: {xs: 10, sm: 15},
    textTransform: 'uppercase',
    borderColor: 'grey.A700',
    color: 'text.secondary',
    width: {xs: 52, sm: 85},
    height: {xs: 34, sm: 55},
    '&:hover': {
      borderColor: 'grey.A700',
      backgroundColor: 'grey.A100',
    },
  },
};

type SizeItemType = {
  id: number;
  value: number;
};

type SiteItemPropsType = {
  size: SizeItemType;
};

const ProductSizeItem = ({size}: SiteItemPropsType) => {
  return (
    <Button sx={styles.button} variant="outlined">
      eu-{size.value}
    </Button>
  );
};

export default ProductSizeItem;
