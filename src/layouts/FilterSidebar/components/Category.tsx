import {Option} from './Option';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ReactNode} from 'react';

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
    name: string | number;
  }[];
  onAddFilter?: (id: number) => void;
  onRemoveFilter?: (id: number) => void;
};

export const Category = ({
  name,
  children,
  options,
  onAddFilter,
  onRemoveFilter,
}: CategoryProps) => {
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
            {options?.map(({id, name}) => (
              <Option
                key={id}
                id={id}
                name={name}
                onAddFilter={onAddFilter!}
                onRemoveFilter={onRemoveFilter!}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
