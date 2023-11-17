import {Grid, LinearProgress, SxProps} from '@mui/material';
import {useEffect, useRef} from 'react';

import useInfiniteGet from '@/hooks/useInfiniteGet';
import {ProductsResponse} from '@/types/product';
import ProductCard from './components/ProductCard';
import ProductCardSkeleton from './components/ProductCardSkeleton';

const styles: Record<string, SxProps> = {
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
};

type Props = {
  params?: Record<string, number | string> | null;
  fullWidth?: boolean;
  children?: React.ReactNode;
  initialProducts?: ProductsResponse;
  setProductsCount?: (count: number) => void;
};

const ProductList = ({
  params = null,
  fullWidth = false,
  children: emptyMessage,
  initialProducts,
  setProductsCount,
}: Props) => {
  const bottomElementRef = useRef<HTMLDivElement>(null);

  const {
    data: products,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGet<ProductsResponse>(
    '/products',
    {
      staleTime: 1000,
      initialData: initialProducts
        ? {pages: [initialProducts], pageParams: [1]}
        : undefined,
    },
    {
      'filters[teamName]': 'team-3',
      'pagination[pageSize]': 10,
      ...params,
    },
  );
  console.log(products);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      {threshold: 1},
    );

    const bottomElement = bottomElementRef.current;
    if (bottomElement) {
      observer.observe(bottomElement);
    }

    return () => {
      if (bottomElement) {
        observer.unobserve(bottomElement);
      }
    };
  }, [bottomElementRef, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (products?.[0]?.meta?.pagination?.total != null) {
      setProductsCount?.(products[0].meta.pagination.total);
    }
  }, [products, setProductsCount]);

  return (
    <Grid
      container
      spacing={{xs: 2, sm: 5, lg: 6, xl: 8}}
      columns={{xs: 12, md: 12, lg: 12, xl: fullWidth ? 10 : 12}}
    >
      {isLoading &&
        new Array(8).fill(0).map((_, index) => (
          <Grid
            key={index}
            item
            xs={6}
            md={fullWidth ? 4 : 6}
            lg={fullWidth ? 3 : 4}
            xl={fullWidth ? 2 : 3}
            sx={styles.gridItem}
          >
            <ProductCardSkeleton />
          </Grid>
        ))}
      {products?.map(page => {
        return page.data.map(product => (
          <Grid
            key={product.id}
            item
            xs={6}
            md={fullWidth ? 4 : 6}
            lg={fullWidth ? 3 : 4}
            xl={fullWidth ? 2 : 3}
            sx={styles.gridItem}
          >
            <ProductCard product={{...product.attributes, id: product.id}} />
          </Grid>
        ));
      })}
      <div ref={bottomElementRef} />
      {isFetchingNextPage && (
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          marginBottom={4}
          marginTop={-2}
        >
          <LinearProgress
            color="primary"
            sx={{width: 1, height: 10, borderRadius: 10}}
          />
        </Grid>
      )}
      {!isLoading && products?.[0].meta.pagination?.total === 0 && (
        <Grid item xs={12} display="flex" justifyContent="center" marginY={5}>
          {emptyMessage}
        </Grid>
      )}
    </Grid>
  );
};
export default ProductList;
