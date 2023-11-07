import {
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  SxProps,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/navigation';

const styles: Record<string, SxProps> = {
  menuList: {
    width: '7rem',
    padding: '0 0.75rem',
  },
  menuItem: {
    padding: '0.5rem 0',
  },
};

type ButtonMenuProps = MenuProps & {
  productId: number;
};

const ButtonMenu = (props: ButtonMenuProps) => {
  const router = useRouter();
  return (
    <Menu {...props}>
      <MenuList sx={styles.menuList}>
        <MenuItem sx={styles.menuItem} divider>
          <Typography fontWeight={300}>View</Typography>
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push(`/my-products/?productId=${props.productId}`)
          }
          sx={styles.menuItem}
          divider
        >
          <Typography fontWeight={300}>Edit</Typography>
        </MenuItem>
        <MenuItem sx={styles.menuItem}>
          <Typography fontWeight={300}>Delete</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ButtonMenu;
