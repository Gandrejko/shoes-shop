import {AppBar, Box, List, Stack} from '@mui/material';

type SidebarLayout = {
  children: React.ReactNode;
};

const SidebarLayout: React.FC<SidebarLayout> = ({children}) => {
  return (
    <>
      <AppBar />
      <Stack direction="row">
        <Box sx={{backgroundColor: 'red', width: 300}} />
        {children}
      </Stack>
    </>
  );
};

export default SidebarLayout;
