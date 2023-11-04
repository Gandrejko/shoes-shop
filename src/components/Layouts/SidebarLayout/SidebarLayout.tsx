import {AppBar, List} from '@mui/material';

type SidebarLayout = {
  children: React.ReactNode;
};

const SidebarLayout: React.FC<SidebarLayout> = ({children}) => {
  return (
    <>
      <AppBar />
      {children}
      <List />
    </>
  );
};

export default SidebarLayout;
