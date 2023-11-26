import DeleteModal from '@/components/common/DeleteModal/DeleteModal';
import {
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  SxProps,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';
import {useState} from 'react';

const styles: Record<string, SxProps> = {
  menuList: {
    p: 0,
    width: '7rem',
    padding: 0,
  },
  menuItem: {
    padding: '0.5rem 1rem',
    '&:hover': {
      backgroundColor: 'grey.A100',
    },
  },
};

type ButtonMenuProps = MenuProps & {
  productid: number;
  onDeleteProduct: () => void;
  isDeleting: boolean;
};

const ButtonMenu = ({
  productid,
  onDeleteProduct,
  isDeleting,
  ...props
}: ButtonMenuProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <Menu {...props}>
        <MenuList sx={styles.menuList}>
          <MenuItem
            divider
            sx={styles.menuItem}
            onClick={() => router.push(`/products/${productid}`)}
          >
            <Typography fontWeight={300}>View</Typography>
          </MenuItem>
          <MenuItem
            divider
            sx={styles.menuItem}
            onClick={e => {
              router.push(`/products/me?productId=${productid}`);
              props.onClose?.(e, 'backdropClick');
            }}
          >
            <Typography fontWeight={300}>Edit</Typography>
          </MenuItem>
          <MenuItem
            sx={styles.menuItem}
            onClick={e => {
              setOpenDeleteModal(true);
              props.onClose?.(e, 'backdropClick');
            }}
          >
            <Typography fontWeight={300}>Delete</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteModal
        header="Are you sure to delete selected item?"
        description="Warning: Deleting this product will permanently remove it from the system. This action cannot be undone. Are you sure you want to proceed?"
        isModalOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => {
          onDeleteProduct();
          setOpenDeleteModal(false);
        }}
        isDeleting={isDeleting}
      />
    </>
  );
};
export default ButtonMenu;
