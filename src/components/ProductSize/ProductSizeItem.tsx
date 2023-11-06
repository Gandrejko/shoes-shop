import {Button, SxProps, useTheme} from '@mui/material';

type SizeItemType = {
  id: number;
  value: number;
};

type SiteItemPropsType = {
  size: SizeItemType;
};

const ProductSizeItem = ({size}: SiteItemPropsType) => {
  const theme = useTheme();
  const styles: Record<string, SxProps> = {
    button: {
      // fontWeigth: theme.typography.fontWeightLight,
      //trying to set fontWeigth but browser add pixels to fontWeigth. But if to it directly in sx prop it works
      textTransform: 'uppercase',
      borderColor: theme.palette.grey.A700,
      color: theme.palette.text.secondary,
      width: 85,
      height: 55,
      '&:hover': {
        borderColor: theme.palette.grey.A700,
        backgroundColor: theme.palette.grey.A100,
      },

      [theme.breakpoints.down('sm')]: {
        fontSize: 10,
        width: 52,
        height: 34,
      },
    },
  };

  return (
    <Button sx={styles.button} variant="outlined">
      eu-{size.value}
    </Button>
  );
};

export default ProductSizeItem;
