import { Box, Skeleton, Typography, SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderRadius: '8px',
        paddingBottom:'40px',
        borderBottom: '1px solid #e0e0e0',
        marginTop: '50px',
    },
    imageContainer: {
        width: {
            xl: 150,
            lg: 150,
            sm: 100,
            xs: 70,
        },
        height: {
            xl: 150,
            lg: 150,
            sm: 100,
            xs: 70,
        },
        marginRight: '16px',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        width: {
            xl: '50%',
            lg: '50%',
            sm: '70%',
            xs: '90%',
        },
    },
    subtitle: {
        width: {
            xl: '20%',
            lg: '20%',
            sm: '40%',
            xs: '50%',
        },
    },
    quantityText: {
        marginRight: '8px',
    },
};

const ProductItemSkeleton = () => {
    return (
        <Box sx={styles.container}>
            <Box sx={styles.imageContainer}>
                <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%'}} />
            </Box>
            <Box sx={styles.textContainer}>
                <Typography variant="h2" sx={styles.title}>
                    <Skeleton variant="text" />
                </Typography>
                <Typography sx={styles.subtitle}>
                    <Skeleton variant="text" />
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    <Typography sx={styles.quantityText}>
                        <Skeleton variant="text" width={30} />
                    </Typography>
                    <Typography>
                        <Skeleton variant="text" width={30} />
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductItemSkeleton;
