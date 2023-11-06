import {Button} from '@mui/material';

type SizeItemType = {
  size: number;
};

const SizeItem = (size: SizeItemType) => {
  return <Button>size</Button>;
};

export default SizeItem;
