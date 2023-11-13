import {MoreHoriz} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Paper,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import {useState} from 'react';

import {ProductAttributes} from '@/types/product';
import ButtonMenu from './ButtonMenu';
import {useRouter} from 'next/router';

const styles: Record<string, SxProps> = {
  card: {
    width: 1,
    borderRadius: 0,
    boxShadow: 'none',
  },
  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 320 / 380,
  },
  moreButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  productDescription: {
    justifyContent: 'space-between',
    gap: '1rem',
    padding: 0,
  },
};

type Props = {
  product: ProductAttributes;
};

const ProductCard = ({product}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();
  const showControls = router.pathname === '/my-products';

  return (
    <Card sx={styles.card}>
      <Box sx={styles.imageContainer}>
        {product.images?.data ? (
          <Image
            src={product.images.data[0].attributes.url}
            alt={product.name!}
            fill
            style={{objectFit: 'cover'}}
          />
        ) : (
          <Paper
            sx={{height: 1, backgroundColor: 'grey.A200', borderRadius: 0}}
          />
        )}
        {showControls && (
          <>
            <IconButton
              aria-label="settings"
              sx={styles.moreButton}
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              <MoreHoriz />
            </IconButton>
            <ButtonMenu
              productId={product.id!}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorEl={anchorEl}
              anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
            />
          </>
        )}
      </Box>
      <CardContent sx={styles.cardContent}>
        <Stack direction="row" sx={styles.productDescription}>
          <Box>
            <Typography variant="h3" fontSize={14}>
              {product.name}
            </Typography>
            {product.gender?.data && (
              <Typography
                variant="h5"
                fontSize={14}
                textTransform="capitalize"
                color={theme => theme.palette.text.secondary}
              >
                {`${product.gender.data.attributes.name}'s Shoes`}
              </Typography>
            )}
          </Box>
          <Typography variant="h3" fontSize={14}>
            ${product.price}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
