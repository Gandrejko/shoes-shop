import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';
import {ReactNode, useMemo} from 'react';
import {Option} from './Option';

const styles = {
  accordion: {
    width: '100%',
    padding: '15px 10px 15px 40px',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
};

type CategoryProps = {
  name: string;
  children?: ReactNode;
  options?: {
    id: number;
    value: string | number;
  }[];
  onAddFilter?: (id: number) => void;
  onRemoveFilter?: (id: number) => void;
};

export const Category = ({name, children, options}: CategoryProps) => {
  const router = useRouter();

  const currentValues = useMemo(() => {
    const currentFilter = router.query[name.toLowerCase()];
    return currentFilter ? (currentFilter as string).split(',') : [];
  }, [name, router.query]);

  const updateFilter = (option: string | number, action: 'add' | 'remove') => {
    let newValues: string[];

    if (action === 'add') {
      newValues = [...currentValues, String(option)];
    }
    if (action === 'remove') {
      newValues = currentValues.filter(value => value !== String(option));
    }

    const updatedQuery = {
      ...router.query,
      [name.toLowerCase()]: newValues!.join(','),
    };
    if (newValues!.length === 0) delete updatedQuery[name.toLowerCase()];

    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      {shallow: true},
    );
  };

  const handleAddFilter = (option: string | number) => {
    updateFilter(option, 'add');
  };

  const handleRemoveFilter = (option: string | number) => {
    updateFilter(option, 'remove');
  };

  return (
    <>
      <Divider />
      <Accordion defaultExpanded disableGutters sx={styles.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{paddingLeft: 0}}>
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{paddingLeft: 0}}>
          {children}
          <Box sx={styles.options}>
            {options?.map(({id, value}) => (
              <Option
                key={id}
                value={value}
                checked={currentValues.includes(String(value))}
                onAddFilter={() => handleAddFilter!(value)}
                onRemoveFilter={() => handleRemoveFilter!(value)}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
