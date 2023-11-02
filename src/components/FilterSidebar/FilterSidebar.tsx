import {Box} from '@mui/material';
import {Category} from './components/Category';

const styles = {
  sidebar: {
    width: '320px',
  },
};

export const FilterSidebar = () => {
  return (
    <Box sx={styles.sidebar}>
      <Category
        name="Gender"
        options={[
          {id: 0, name: 'men'},
          {id: 1, name: 'women'},
        ]}
      />
      <Category
        name="Gender"
        options={[
          {id: 0, name: 'men'},
          {id: 1, name: 'women'},
        ]}
      />
      <Category
        name="Gender"
        options={[
          {id: 0, name: 'men'},
          {id: 1, name: 'women'},
        ]}
      />
    </Box>
  );
};
