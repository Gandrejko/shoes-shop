import {RefObject, useEffect, useState, useCallback} from 'react';
import {Box, IconButton} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import theme from '@/config/theme';

type ScrollToTopProps = {
  containerRef: RefObject<HTMLDivElement>;
};

const styles = {
  arrow: {
    fill: `${theme.palette.background.default}`,
    borderRadius: '50%',
    backgroundColor: `${theme.palette.primary.main}`,
    height: {
      xl: '42px',
      sm: '36px',
      xs: '32px',
    },
    width: {
      xl: '42px',
      sm: '36px',
      xs: '32px',
      color: 'primary',
    },
  },
  scrollContainer: {
    position: 'absolute',
    padding: {
      lg: '0 50px 50px 0 ',
      sm: '0 20px 20px 0 ',
      xs: '0 10px 20px 0 ',
    },
    right: 0,
    bottom: 0,
  },
};

const ScrollToTop = ({containerRef}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setIsVisible(containerRef.current.scrollTop > 400);
    }
  }, [containerRef]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [containerRef, handleScroll]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setIsVisible(false);
  };

  return (
    <Box
      sx={{...styles.scrollContainer, display: isVisible ? 'block' : 'none'}}
    >
      <IconButton onClick={scrollToTop}>
        <ArrowUpwardIcon sx={styles.arrow} />
      </IconButton>
    </Box>
  );
};

export default ScrollToTop;
