import {Option} from './Option';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
};

type CategoryProps = {
  name: string;
  children?: ReactNode;
  options?: {
    id: number;
    name: string;
  }[];
};

export const Category = ({name, children, options}: CategoryProps) => {
  return (
    <>
      <Accordion defaultExpanded disableGutters sx={styles.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
          {options?.map(({id, name}) => <Option key={id} name={name} />)}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
