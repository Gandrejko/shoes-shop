import {Box, SxProps, Typography, useTheme} from '@mui/material';
import ProductSizeItem from './ProductSizeItem';

type SizeItemType = {
  id: number;
  value: number;
};

type ProdcutListProps = {
  sizes: SizeItemType[];
  header: string;
};

const ProductSizeList = ({sizes, header}: ProdcutListProps) => {
  const theme = useTheme();

  const styles: Record<string, SxProps> = {
    box: {width: '100%'},
    header: {
      fontSize: 20,
      color: theme.palette.grey.A700,
      marginBottom: theme.spacing(3),
    },
    sizesBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: theme.spacing(3),
    },

    [theme.breakpoints.down('sm')]: {
      header: {
        marginBottom: '5px',
      },
      sizesBox: {
        gap: theme.spacing(2),
      },
    },
  };

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
