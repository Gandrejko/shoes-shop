import {useState} from 'react';
import {Box, IconButton, Stack, SxProps} from '@mui/material';
import Image from 'next/image';

export const images: string[] = [
  '/images/item1.svg',
  '/images/item2.svg',
  '/images/item3.svg',
  '/images/item4.svg',
  '/images/item5.svg',
  '/images/item6.svg',
  '/images/item7.svg',
];

const styles: Record<string, SxProps> = {
  imageBox: {
    position: 'relative',
  },
  buttonsBox: {
    position: 'absolute',
    bottom: '24px',
    right: '38px',
  },
};

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const nextImage = () => {
    setCurrentImage(prevImage => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prevImage =>
      prevImage === 0 ? images.length - 1 : prevImage - 1,
    );
  };

  return (
    <Stack direction="row" spacing={2}>
      <Stack direction="column" spacing={2}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            width={76}
            height={76}
            style={{
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              opacity: index === currentImage ? '0.35' : '1',
            }}
            onClick={() => setCurrentImage(index)}
            onMouseEnter={e => {
              if (e.target instanceof HTMLElement) {
                e.target.style.filter = 'grayscale(100%)';
              }
            }}
            onMouseLeave={e => {
              if (e.target instanceof HTMLElement) {
                e.target.style.filter = 'grayscale(100%)';
              }
            }}
          />
        ))}
      </Stack>
      <Box sx={styles.imageBox}>
        <Image
          src={images[currentImage]}
          alt={`Image ${currentImage + 1}`}
          style={{objectFit: 'cover', height: '628px'}}
          width={588}
          height={628}
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
