import ImageSlider from '@/components/common/ImageSlider/ImageSlider';
import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import {ProductResponse, ProductsResponse} from '@/types';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  SxProps,
  Typography,
} from '@mui/material';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {GetStaticPropsContext} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {ReactElement, useState} from 'react';
import {toast} from 'react-toastify';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: '16px', md: '35px'},
    display: 'flex',
    flexDirection: {xs: 'column', md: 'row'},
    gap: '3vw',
  },
  productContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  productImage: {
    width: '100%',
    maxWidth: '400px',
  },
  productLabel: {
    textAlign: 'left',
    fontSize: '18px',
    fontWeight: 400,
  },
  productPrice: {
    fontSize: '18px',
  },
  btnContainer: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    gap: '10px',
    width: '100%',
  },
  addToCartButton: {
    flexBasis: '50%',
    padding: {
      xs: '10px 15px',
      sm: '16px 20px',
    },
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  textContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    gap: '20px',
  },
  subheader: {
    display: 'flex',
    width: '100%',
    gap: '10px',
  },
  categories: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  category: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  sizesContainer: {
    marginTop: '10px',
    width: '100%',
  },
  description: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  buttonsList: {
    paddingTop: '1rem',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    fontWeight: 'fontWeighRegular',
    fontSize: {xs: 10, sm: 15},
    textTransform: 'uppercase',
    borderColor: 'grey.A700',
    color: 'text.secondary',
    padding: {xs: '8px 15px', sm: '10px 20px'},
    '&:hover': {
      borderColor: 'grey.A700',
      backgroundColor: 'grey.A100',
    },
  },
  emptyImageContainer: {
    position: 'relative',
    backgroundColor: 'grey.A100',
    maxWidth: {sm: 550, md: 440, xl: 600},
    height: {xs: '320px', sm: 550, md: 440, xl: 600},
    width: {xs: '100%'},
    display: 'flex',
  },
  emptyImage: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
};

type ProductProps = {
  product: ProductResponse;
};

const Product = ({product: data}: ProductProps) => {
  const router = useRouter();
  const productId = router.query.productid as string;
  const [choosedSize, setChoosedSize] = useState<number>(0);

  const product = {id: data?.data.id, ...data?.data.attributes};

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationKey: ['cart'],
    mutationFn: async () => {
      const existingData = JSON.parse(localStorage.getItem('cart') || '{}');
      if (productId in existingData) {
        toast.error('This item is already in your cart');
        return;
      }
      toast.success('You have successfully added an item to your cart');
      const updatedCartData = {...existingData, [productId]: 1};
      localStorage.setItem('cart', JSON.stringify(updatedCartData));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cart']});
    },
  });

  const gender = product?.gender?.data?.attributes.name;
  const color = product?.color?.data?.attributes.name;
  const sizes = product?.sizes?.data;
  const categories = product?.categories?.data;
  const images = product?.images?.data?.map(({attributes: {url}}) => url) || [];

  if (router.isFallback) {
    return (
      <Container maxWidth="xl" sx={{...styles.container, height: 1}}>
        <CircularProgress size={100} style={{margin: 'auto'}} />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Box sx={styles.productContainer}>
        {images.length > 0 ? (
          <ImageSlider images={images} />
        ) : (
          <Paper sx={styles.emptyImageContainer}>
            <Image fill src="/icons/galleryIcon.svg" alt="no image" />
          </Paper>
        )}
      </Box>
      <Box sx={styles.productContainer}>
        <Box sx={styles.textContainer}>
          <Typography variant="h1">{product?.name}</Typography>
          <Typography variant="h4" sx={styles.productPrice}>
            ${product?.price}
          </Typography>
        </Box>
        <Box sx={styles.subheader}>
          {gender && (
            <Typography variant="h4" sx={styles.productGender}>
              {gender}&apos;s Shoes
            </Typography>
          )}
          {color && (
            <Typography variant="h4" sx={styles.productGender}>
              | {color}
            </Typography>
          )}
        </Box>
        {categories && categories.length !== 0 && (
          <Box sx={styles.categories}>
            <Typography variant="h4">Categories: </Typography>
            {categories?.map(({id, attributes: {name}}, index) => (
              <Typography key={id} component="span" sx={styles.category}>
                {name + (index !== categories.length - 1 ? ',' : '')}
              </Typography>
            ))}
          </Box>
        )}
        {sizes && sizes.length !== 0 && (
          <Box sx={styles.sizesContainer}>
            <Typography variant="h4" sx={styles.productLabel}>
              Select Size
            </Typography>
            <Box sx={styles.buttonsList}>
              {sizes
                .sort((a, b) => a.attributes.value - b.attributes.value)
                .map(({id, attributes: {value}}) => {
                  const isChecked = id === choosedSize;
                  return (
                    <Button
                      key={id}
                      sx={{
                        ...styles.button,
                        color: isChecked ? 'white' : 'text.secondary',
                      }}
                      variant={isChecked ? 'contained' : 'outlined'}
                      onClick={() => setChoosedSize(id)}
                    >
                      EU-{value}
                    </Button>
                  );
                })}
            </Box>
          </Box>
        )}
        <Box sx={styles.btnContainer}>
          <Button
            onClick={() => mutate()}
            variant="contained"
            sx={styles.addToCartButton}
          >
            Add to Bag
          </Button>
        </Box>
        <Box sx={styles.description}>
          <Typography variant="h4">Description</Typography>
          <Typography variant="h4" sx={styles.productLabel}>
            {product?.description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>{page.props.product?.data?.attributes.name}</title>
        <meta
          name="description"
          content={page.props.product?.data?.attributes.description}
        />
      </Head>
      <HeaderLayout>{page}</HeaderLayout>
    </>
  );
};

export async function getStaticPaths() {
  try {
    const {data: products} = await axios.get<ProductsResponse>(
      `${process.env.API_URL}/products`,
      {
        params: {
          'pagination[page]': 1,
          'pagination[pageSize]': 12,
          'filters[teamName]': 'team-3',
          sort: 'createdAt:desc',
          fields: 'id',
        },
      },
    );

    const paths = products.data.map(({id}) => ({
      params: {productid: id.toString()},
    }));

    return {paths, fallback: true};
  } catch (error) {
    console.error('Error fetching product data:', error);
    return {paths: [], fallback: true};
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const productId = context.params?.productid;

    const {data: product} = await axios.get<ProductResponse>(
      `${process.env.API_URL}/products/${productId}`,
      {
        params: {
          populate: '*',
        },
      },
    );

    return {props: {product}};
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }
}

export default Product;
