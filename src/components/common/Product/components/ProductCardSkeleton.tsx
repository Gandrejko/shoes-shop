import {Box, Skeleton, Stack} from '@mui/material';

const ProductCardSkeleton = () => {
  return (
    <Box sx={{width: 1}}>
      <Box sx={{aspectRatio: 320 / 380}}>
        <Skeleton variant="rectangular" sx={{width: 1, height: 1}} />
      </Box>
      <Stack direction="row" gap={2}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="20%" />
      </Stack>
      <Skeleton variant="text" width="60%" />
    </Box>
  );
};
export default ProductCardSkeleton;
