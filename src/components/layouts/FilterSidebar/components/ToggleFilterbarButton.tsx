import {Button, SxProps, useTheme} from '@mui/material';
import Image from 'next/image';

const styles: Record<string, SxProps> = {
  buttonStyles: {
    color: 'text.secondary',
    border: '2px solid #bdbdbd',
    minWidth: {xs: '140px', lg: '200px'},
  },
};

type Props = {
  isMobile: boolean;
  show: boolean;
  onToggle: () => void;
};

const ToggleFilterbarButton = ({isMobile, show, onToggle}: Props) => {
  const theme = useTheme();

  return (
    <Button
      variant="text"
      sx={{
        ...styles.buttonStyles,
        display: isMobile ? {md: 'none'} : {xs: 'none', md: 'inline-flex'},
      }}
      onClick={onToggle}
      endIcon={
        <Image
          src={`/icons/filters${show ? 'Hide' : 'Show'}.svg`}
          alt=""
          width={24}
          height={24}
          style={{
            filter:
              theme.palette.mode === 'dark' ? 'brightness(2)' : 'brightness(1)',
          }}
        />
      }
    >
      {show && 'Hide'} Filters
    </Button>
  );
};
export default ToggleFilterbarButton;
