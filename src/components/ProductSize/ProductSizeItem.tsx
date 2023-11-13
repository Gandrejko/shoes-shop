import {Size} from '@/types/size';
import {Button, SxProps} from '@mui/material';

const styles = (isChecked: boolean): SxProps => ({
  fontWeight: 'fontWeighRegular',
  fontSize: {xs: 10, sm: 15},
  textTransform: 'uppercase',
  borderColor: 'grey.A700',
  color: isChecked ? 'white' : 'text.secondary',
  width: {xs: 52, sm: 85},
  height: {xs: 34, sm: 55},
  '&:hover': {
    borderColor: 'grey.A700',
    backgroundColor: 'grey.A100',
  },
});

type SiteItemPropsType = {
  size: Size;
  onClick: (id: number) => void;
  isChecked: boolean;
};

const ProductSizeItem = ({size, onClick, isChecked}: SiteItemPropsType) => {
  return (
    <Button
      sx={styles(isChecked)}
      variant={isChecked ? 'contained' : 'outlined'}
      onClick={() => onClick(size.id)}
    >
      eu-{size.value}
    </Button>
  );
};

export default ProductSizeItem;
