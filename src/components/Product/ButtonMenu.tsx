import {Menu, MenuItem, MenuList, MenuProps, SxProps} from '@mui/material';

const styles: Record<string, SxProps> = {
  menuList: {
    width: '7rem',
    padding: '0.25rem 0.75rem',
  },
  menuItem: {
    padding: '0.5rem 0',
  },
};

const ButtonMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuList sx={styles.menuList}>
        <MenuItem sx={styles.menuItem} divider>
          View
        </MenuItem>
        <MenuItem sx={styles.menuItem} divider>
          Edit
        </MenuItem>
        <MenuItem sx={styles.menuItem}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ButtonMenu;
