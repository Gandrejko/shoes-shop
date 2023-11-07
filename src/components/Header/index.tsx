import {
  AppBar,
  Box,
  Divider,
  SxProps, useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileHeader from '@/components/Header/components/MobileHeader';
import DesktopHeader from '@/components/Header/components/DesktopHeader';


const styles: Record<string, SxProps> = {
  appBar: {
    height: '100%',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    border: 'none',
    boxShadow: 'none',
  }
};

export type HeaderProps = {
  userLoggedIn: boolean;
};

const Header = () => {
  const theme = useTheme();
  const isMobileMode = useMediaQuery(theme.breakpoints.down('md'));
  const userLoggedIn = false;

  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <AppBar sx={styles.appBar}>
        {isMobileMode ? (
          <MobileHeader userLoggedIn={userLoggedIn} />
        ) : (
          <DesktopHeader userLoggedIn={userLoggedIn} />
        )}
        <Divider />
      </AppBar>
    </Box>
  );
};

export default Header;
