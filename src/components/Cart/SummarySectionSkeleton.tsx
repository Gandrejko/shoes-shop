import { Box, Skeleton, Typography, SxProps } from '@mui/material';

const SummarySectionSkeleton = () => {
    const styles: Record<string, SxProps> = {
        container: {
            marginTop: '60px',
            marginBottom: '70px',
        },
        sectionItem: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4px',
        },
        totalSection: {
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '60px',
            paddingBottom: '30px',
            borderTop: '1px solid #EAECF0',
            borderBottom: '1px solid #EAECF0',
        },
        title: {
            width: {
                xl: '30%',
                lg: '30%',
                sm: '30%',
                xs: '30%',
            },
        },
        subtitle: {
            width: {
                xl: '20%',
                lg: '20%',
                sm: '30%',
                xs: '30%',
            },
        }
    };

    return (
        <Box sx={styles.container}>
            <Typography variant="h1" component="h2" sx={{ marginBottom: '2' }}>
                <Skeleton variant="text" width={100} />
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {new Array(3).fill(0).map((item, index) => (
                    <Box
                        key={index}
                        sx={styles.sectionItem}
                    >
                        <Typography sx={styles.title} variant="h2">
                            <Skeleton variant="text" />
                        </Typography>
                        <Typography sx={styles.subtitle} variant="h2">
                            <Skeleton variant="text" />
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={styles.totalSection}>
                <Typography variant="h2" sx={{ marginTop: '4' }}>
                    <Skeleton variant="text" width={50} />
                </Typography>
                <Typography variant="h2" sx={{ marginTop: '4' }}>
                    <Skeleton variant="text" width={50} />
                </Typography>
            </Box>
        </Box>
    );
};

export default SummarySectionSkeleton;
