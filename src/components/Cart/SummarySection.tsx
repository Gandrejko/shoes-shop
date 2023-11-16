import {Box, Typography, Button, SxProps} from '@mui/material';

const styles: Record<string, SxProps> = {
  container: {
    marginTop: {
      xl: '0px',
      lg: '0px',
      sm: '70px',
      xs: '70px',
    },
    marginBottom: '70px',
  },
  heading: {
    marginBottom: 2,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionItem: {
    fontWeight: '400',
    fontSize: 30,
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '60px',
    paddingBottom: '30px',
    borderTop: '1px solid #EAECF0',
    borderBottom: '1px solid #EAECF0',
  },
  totalItem: {
    marginTop: 4,
  },
  checkoutButton: {
    width: '100%',
    marginTop: {
      xl: '100px',
      lg: '100px',
      sm: '50px',
      xs: '50px',
    },
  },
};

const SummarySection = ({products}: {products: any[]}) => {
  const total = products.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);

  return (
    <Box sx={styles.container}>
      <Typography variant="h1" component="h2" sx={styles.heading}>
        Summary
      </Typography>

      <Box sx={styles.section}>
        <Box sx={styles.sectionItem}>
          <Typography variant="h2">Subtotal</Typography>
          <Typography variant="h2">${total.toFixed(2)}</Typography>
        </Box>

        <Box sx={styles.sectionItem}>
          <Typography variant="h2">Shipping</Typography>
          <Typography variant="h2">$0</Typography>
        </Box>

        <Box sx={styles.sectionItem}>
          <Typography variant="h2">Tax</Typography>
          <Typography variant="h2">$0</Typography>
        </Box>
      </Box>

      <Box sx={styles.totalSection}>
        <Typography variant="h2" sx={styles.totalItem}>
          Total
        </Typography>
        <Typography variant="h2" sx={styles.totalItem}>
          ${total.toFixed(2)}
        </Typography>
      </Box>
      <Button variant="contained" sx={styles.checkoutButton}>
        Checkout
      </Button>
    </Box>
  );
};

export default SummarySection;
