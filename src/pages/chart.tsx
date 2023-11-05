import { Box, Typography } from '@mui/material';
import ProductItem from "@/components/Chart/ProductItem";
import SummarySection from "@/components/Chart/SummarySection";
import EmptyCartPage from "@/components/Chart/EmptyCartPage";
import products from "@/temp/data";

const ChartPage = () => {
    //to check emptyPage write:      const isEmpty = products.length === 6;


    const isEmpty = products.length == 0;

    return (
        <Box sx={{ display: 'flex', gap: '10%' }}>
            {isEmpty ? (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <EmptyCartPage />
                </Box>
            ) : (
                <>
                    <Box sx={{ width: '62%' }}>
                        <Typography component="h1" sx={{ fontWeight: 500, fontSize: 45, marginBottom: 2 }}>
                            Chart
                        </Typography>
                        {products.map((product) => (
                            <ProductItem product={product} key={product.id} />
                        ))}
                    </Box>
                    <Box sx={{ width: '38%' }}>
                        <SummarySection products={products} />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ChartPage;