import {FiltersData} from '@/types';
import {Drawer, SxProps, Theme, useMediaQuery} from '@mui/material';
import {useRouter} from 'next/router';
import FiltersDrawer from './components/FiltersDrawer';

const styles: Record<string, SxProps<Theme>> = {
  sidebar: {
    '&.MuiDrawer-root': {
      position: 'relative',
    },
    '& .MuiDrawer-paper': {
      position: {md: 'sticky'},
      width: 350,
      height: {md: 'calc(100vh - 120px)'},
      paddingLeft: {md: 4},
      border: 'none',
      overflowX: 'hidden',
      backgroundImage: 'none',
    },
    '& .MuiModal-backdrop': {
      backgroundColor: 'grey.A400',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
    zIndex: (theme: Theme) => ({md: theme.zIndex.appBar - 1})!,
    transition: 'width 0.2s ease-in-out',
  },
};

type Props = {
  open: boolean;
  searchingString: string;
  productsCount: number;
  filtersData: FiltersData;
  onClose: () => void;
};

export const FilterSidebar = ({
  searchingString,
  productsCount,
  filtersData,
  open,
  onClose,
}: Props) => {
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down('md');
  });

  const handleClearFilters = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      {shallow: true},
    );
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      {/* Desktop */}
      <Drawer
        open={open}
        onClose={onClose}
        anchor={'left'}
        variant={'persistent'}
        sx={{
          ...styles.sidebar,
          width: open ? 370 : 0,
          display: {xs: 'none', md: 'block'},
        }}
      >
        <FiltersDrawer
          isMobile={false}
          productsCount={productsCount}
          searchingString={searchingString}
          filtersData={filtersData}
          onClearFilters={handleClearFilters}
          onClose={onClose}
        />
      </Drawer>

      {/* Mobile */}
      <Drawer
        open={open}
        onClose={onClose}
        anchor={'right'}
        variant={'temporary'}
        sx={{
          ...styles.sidebar,
          width: open ? 370 : 0,
          display: {md: 'none'},
        }}
      >
        <FiltersDrawer
          isMobile={true}
          productsCount={productsCount}
          searchingString={searchingString}
          filtersData={filtersData}
          onClearFilters={handleClearFilters}
          onClose={onClose}
        />
      </Drawer>
    </>
  );
};
