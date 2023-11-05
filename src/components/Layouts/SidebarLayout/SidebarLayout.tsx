import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

type SidebarLayout = {
  children: React.ReactNode;
};

const SidebarLayout: React.FC<SidebarLayout> = ({children}) => {
  return (
    <>
      <CssBaseline />
      <Box maxWidth="xl" sx={{p: 0}}>
        <Box sx={{flexGrow: 1}}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          {children}
        </Stack>
      </Box>
    </>
  );
};

export default SidebarLayout;
