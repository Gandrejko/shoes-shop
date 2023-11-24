import {Box, Card, CardActionArea, SxProps} from '@mui/material';
import Image from 'next/image';
import React, {useState} from 'react';

const styles: Record<string, SxProps> = {
  card: {
    position: 'relative',
    borderRadius: 0,
    boxShadow: 'none',
    width: 1,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 320 / 380,
  },
  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.3s ease-in-out',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

type ImageCardProps = {
  image: {
    id: number;
    url: string;
  };
  onDelete: () => void;
  isLoading?: boolean;
};

const ImageCard = ({image, onDelete, isLoading}: ImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card
      sx={styles.card}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Box sx={styles.imageContainer}>
        <Image
          src={image.url}
          alt="product"
          fill
          sizes="100%"
          style={{objectFit: 'cover'}}
        />
        <Box
          sx={{
            ...styles.overlay,
            opacity: isHovered ? '0.7' : 0,
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          <CardActionArea
            sx={styles.circle}
            onClick={() => !isLoading && onDelete()}
          >
            <Image
              width={20}
              height={20}
              src="/icons/imageDelete.svg"
              alt="delete product"
            />
          </CardActionArea>
        </Box>
      </Box>
    </Card>
  );
};

export default ImageCard;
