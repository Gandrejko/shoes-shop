import {ProductAttributes} from '@/types';
import {Slider, SxProps} from '@mui/material';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

const styles: Record<string, SxProps> = {
  slider: {
    marginTop: '25px',
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 16,
      width: 16,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 40,
      height: 40,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: 'primary.main',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': {display: 'none'},
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
    '& .MuiSlider-rail': {
      color: 'grey.A200',
    },
  },
};

const PriceSlider = () => {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([-1, -1]);
  const [productMaxPrice, setProductMaxPrice] = useState(1000);

  useEffect(() => {
    const getBiggestPrice = async () => {
      const response = await axios.get(`${process.env.API_URL}/products`, {
        params: {
          'pagination[page]': 1,
          'pagination[pageSize]': 1,
          'filters[teamName]': 'team-3',
          fields: 'price',
          sort: 'price:desc',
        },
      });

      setProductMaxPrice(response.data.data[0].attributes.price || 1000);
      setPriceRange(prevPriceRange => {
        if (prevPriceRange[1] === -1) {
          return [0, response.data.data[0].attributes.price || 1000];
        }
        return prevPriceRange;
      });
    };

    getBiggestPrice();
  }, []);

  useEffect(() => {
    const minPrice = router.query.minPrice;
    const maxPrice = router.query.maxPrice;
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
    } else {
      setPriceRange([0, productMaxPrice]);
    }
  }, [router.query.maxPrice, router.query.minPrice, productMaxPrice]);

  const handlePriceSelected = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      },
    });
  };

  return (
    <Slider
      max={productMaxPrice}
      value={priceRange}
      onChange={(_, value) => setPriceRange(value as number[])}
      onChangeCommitted={handlePriceSelected}
      valueLabelFormat={value => `$${value}`}
      valueLabelDisplay="auto"
      getAriaLabel={() => 'Price range'}
      getAriaValueText={() => [priceRange[0], priceRange[1]].toString()}
      sx={styles.slider}
    />
  );
};
export default PriceSlider;
