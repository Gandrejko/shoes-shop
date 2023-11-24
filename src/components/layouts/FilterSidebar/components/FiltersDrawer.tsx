import {FiltersData} from '@/types';
import {
  Box,
  Button,
  IconButton,
  Stack,
  SxProps,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import {Category} from './Category';
import PriceSlider from './PriceSlider';

const styles: Record<string, SxProps> = {
  header: {
    flexDirection: {xs: 'row-reverse', md: 'column'},
    justifyContent: 'space-between',
    gap: 3,
    padding: {xs: '26px 20px', md: '44px 40px 16px 0'},
    paddingLeft: {xs: 5},
    backgroundColor: 'background.paper',
  },
};

type Props = {
  isMobile: boolean;
  searchingString: string;
  productsCount: number;
  filtersData: FiltersData;
  onClose: () => void;
  onClearFilters: () => void;
};

const FiltersDrawer = ({
  isMobile,
  productsCount,
  searchingString,
  filtersData,
  onClearFilters,
  onClose,
}: Props) => {
  const theme = useTheme();

  const {genders, colors, brands, categories, sizes} = filtersData;

  return (
    <>
      <Stack sx={styles.header}>
        {isMobile ? (
          <IconButton onClick={onClose} sx={{display: {md: 'none'}}}>
            <Image
              src="/icons/burgerClose.svg"
              alt=""
              width={20}
              height={20}
              style={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(10)'
                    : 'brightness(1)',
              }}
            />
          </IconButton>
        ) : (
          <Box>
            <Typography>
              {searchingString
                ? `Searching results for: ${searchingString}`
                : 'Shoes'}
            </Typography>
            <Typography>
              {searchingString && `Products found - ${productsCount}`}
            </Typography>
          </Box>
        )}
        <Button onClick={onClearFilters} variant="outlined">
          Clear filters
        </Button>
      </Stack>

      {/* Categories */}
      <Category
        name="Gender"
        options={genders?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category
        name="Color"
        options={colors?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category
        name="Brand"
        options={brands?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category
        name="Categories"
        options={categories?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category name="Price">
        <PriceSlider />
      </Category>
      <Category
        name="Sizes"
        options={sizes?.data.map(({id, attributes}) => ({
          id,
          value: attributes.value!,
        }))}
      />
    </>
  );
};
export default FiltersDrawer;
