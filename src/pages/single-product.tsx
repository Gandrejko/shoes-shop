import { Box, Container, Typography, SxProps, Card, CardMedia } from '@mui/material';
import products from '@/temp/data';
import { Button } from '@/components/Button/Button';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import Header from '@/components/Header'

const styles: Record<string, SxProps> = {
    container: {
        padding: { xs: '16px', md: '35px', display: 'flex' }
    },
    productContainer: {
        width: '80%',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
    },
    productImage: {
        width: '100%',
        maxWidth: '400px',
    },
    productName: {
        fontSize: '45px',
        fontWeight: 500,
    },
    productGender: {
        textAlign: 'left',
        fontSize: '18px',
        fontWeight: 400,
    },
    productPrice: {
        position: 'absolute',
        right: '0',
        bottom: '0',
        fontSize: '18px',
        fontWeight: 500,
    },
    addToCartButton: {
        minWidth: '48%',
        textTransform: 'none',
        padding: '16px 70px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#0056b3',
        },
    },
    textContainer: {
        position: 'relative',
        width: '100%',
        justifyContent: 'space-between',
        display: 'flex'
    },
    btnContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    picturesContainer: {
        width:'100%',
        display: 'flex',
        justifyContent:'center',
        alignContent:'center',
        flexDirection: 'column'
    },
    arrayOfImages: {
        gap:'10px',
        display: 'flex',
        justifyContent:'center',
    }
};

const SingleProductPage = () => {
    const product = products[0];

    return (


        <Container maxWidth="xl" sx={styles.container}>
            {/* <Header/> */}
            <Box sx={styles.productContainer}>
                <ImageSlider />
            </Box>
            <Box sx={styles.productContainer}>
                <Box sx={styles.textContainer}>
                    <Typography variant="h1" sx={styles.productName}>
                        {product.name}
                    </Typography>
                    <Typography variant="h4" sx={styles.productPrice}>
                        ${product.price}
                    </Typography>
                </Box>


                <Box sx={styles.picturesContainer}>
                    <Typography variant="h4" sx={styles.productGender}>
                        {product.gender}'s Shoes
                    </Typography>
                    <Box   sx={styles.arrayOfImages}>
                        {products.map((p) => (
                            <Card key={p.id} sx={styles.productImageCard}>
                                <CardMedia
                                    component="img"
                                    alt={p.name}
                                    height="80"
                                    image={p.image}
                                />
                            </Card>
                        ))}
                    </Box>

                </Box>
                <Box sx={styles.btnContainer}>
                    <Button sx={styles.addToCartButton}>Favorite</Button>
                    <Button sx={styles.addToCartButton}>Add to Bag</Button>
                </Box>

            </Box>
        </Container>
    );
};

export default SingleProductPage;

