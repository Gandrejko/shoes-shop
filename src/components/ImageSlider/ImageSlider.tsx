import theme from '@/styles/theme/commonTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useState} from 'react';
import {Box, IconButton, Stack, SxProps} from '@mui/material';
import Image from 'next/image';

const styles: Record<string, SxProps> = {
  container: {
    width: {xs: '100%', sm: 550, md: 440, xl: 600},
    height: {xs: '100%', sm: 650, md: 480, xl: 500},
  },
  imagesContainer: {
    overflow: 'hidden',
    overflowX: {
      xs: 'auto',
      lg: 'visible',
    },
    overflowY: {
      xs: 'visible',
      lg: 'auto',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    minWidth: 80,
    minHeight: 90,
  },
  smallImageBox: {
    position: 'relative',
    minHeight: 80,
    minWidth: 80,
    maxHeight: 80,
    maxWidth: 80,
  },
  imageBox: {
    position: 'relative',
    aspectRatio: '9/10',
    width: 1,
    height: 1,
  },
  buttonsBox: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
  },
};

type ImageSliderProps = {
  images: string[];
};

const ImageSlider = ({images}: ImageSliderProps) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const nextImage = () => {
    setCurrentImage(prevImage => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prevImage =>
      prevImage === 0 ? images.length - 1 : prevImage - 1,
    );
  };

  return (
    <Stack
      direction={isMobile ? 'column-reverse' : 'row'}
      spacing={2}
      sx={styles.container}
    >
      <Stack
        direction={isMobile ? 'row' : 'column'}
        spacing={2}
        sx={styles.imagesContainer}
      >
        {images.map((image, index) => (
          <Box sx={styles.smallImageBox} key={index}>
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              width={80}
              height={80}
              style={{
                cursor: 'pointer',
                transition: '0.4  s',
                opacity: index === currentImage ? '0.35' : '1',
                objectFit: 'cover',
              }}
              onClick={() => setCurrentImage(index)}
              onMouseEnter={e => {
                if (e.target instanceof HTMLElement) {
                  e.target.style.filter = 'grayscale(100%)';
                }
              }}
              onMouseLeave={e => {
                if (e.target instanceof HTMLElement) {
                  e.target.style.filter = 'grayscale(0%)';
                }
              }}
            />
          </Box>
        ))}
      </Stack>
      <Box sx={styles.imageBox}>
        <Image
          src={images[currentImage]}
          alt={`Image ${currentImage + 1}`}
          style={{objectFit: 'cover'}}
          fill
        />
        <Box sx={styles.buttonsBox}>
          <IconButton onClick={prevImage}>
            <Image
              src="/icons/arrowPrev.svg"
              alt="prev"
              width={24}
              height={24}
            />
          </IconButton>
          <IconButton onClick={nextImage}>
            <Image
              src="/icons/arrowNext.svg"
              alt="next"
              width={24}
              height={24}
            />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
};

export default ImageSlider;
