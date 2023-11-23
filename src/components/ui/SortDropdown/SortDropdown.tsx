import {useRouter} from 'next/router';
import Dropdown from '../Dropdown/Dropdown';
import {useEffect, useState} from 'react';

export type SortType =
  | 'createdAt:desc'
  | 'createdAt:asc'
  | 'price:desc'
  | 'price:asc';

type PropsType = {
  value?: SortType;
  handleChooseSort?: (value: SortType) => void;
};

export const options: Array<{value: SortType; name: string}> = [
  {value: 'createdAt:desc', name: 'new first'},
  {value: 'createdAt:asc', name: 'old first'},
  {value: 'price:desc', name: 'high to low'},
  {value: 'price:asc', name: 'low to high'},
];

export const SortDropdown = ({value, handleChooseSort}: PropsType) => {
  const router = useRouter();
  const [sortType, setSortType] = useState(options[0].value);

  useEffect(() => {
    const {sort} = router.query;
    if (sort) {
      setSortType(
        typeof sort === 'string' ? (sort as SortType) : (sort[0] as SortType),
      );
    }
  }, []);

  const onChangeHandler = (value: SortType) => {
    const updatedQuery: {sort?: string} = {
      ...router.query,
      sort: value,
    };
    if (value === options[0].value) {
      delete updatedQuery['sort'];
    }

    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      {shallow: true},
    );
    setSortType(value);
  };

  return (
    <Dropdown
      value={sortType}
      options={options}
      onChange={e => onChangeHandler(e.target.value as SortType)}
      withoutNone
    />
  );
};
