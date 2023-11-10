import {Box, Typography, Button} from '@mui/material';

const SummarySection = ({products}: {products: any[]}) => {
  return (
    <Box>
      <Typography
        component="h4"
        sx={{fontWeight: '500', fontSize: 45, marginBottom: '70px'}}
      >
        Summary
      </Typography>

      <Typography
        component="h4"
        sx={{
          fontWeight: '400',
          fontSize: 20,
          marginTop: 4,
          marginBottom: '20px',
        }}
      >
        Do you have a promocode?
      </Typography>

      <Box sx={{display: 'flex', flexDirection: 'Column'}}>
        <Box
          sx={{
            fontWeight: '400',
            fontSize: 30,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            Subtotal
          </Typography>
          <Typography component="h4" sx={{fontSize: 30, marginTop: 4}}>
            0
          </Typography>
        </Box>

        <Box
          sx={{
            fontWeight: '400',
            fontSize: 30,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            Shipping
          </Typography>
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            0
          </Typography>
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            Tax
          </Typography>
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            0
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '60px',
          paddingBottom: '30px',
          borderTop: '1px solid #EAECF0',
          borderBottom: '1px solid #EAECF0',
        }}
      >
        <Typography
          component="h4"
          sx={{fontWeight: '600', fontSize: 30, marginTop: 4}}
        >
          Total
        </Typography>
        <Typography
          component="h4"
          sx={{fontWeight: '600', fontSize: 30, marginTop: 4}}
        >
          0
        </Typography>
      </Box>
      <Button variant='outlined' sx={{width:'100%', marginTop:'100px'}}>
        Checkout
      </Button>
    </Box>
  );
};

export default SummarySection;
