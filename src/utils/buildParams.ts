export default function buildParams(
  query: any,
  additionalParams: Record<string, string | number> = {},
) {
  const params: typeof additionalParams = {};

  const genders = query.gender ? (query.gender as string).split(',') : [];
  const brands = query.brand ? (query.brand as string).split(',') : [];
  const colors = query.color ? (query.color as string).split(',') : [];
  const sizes = query.sizes ? (query.sizes as string).split(',') : [];
  const categories = query.categories
    ? (query.categories as string).split(',')
    : [];

  const searchString = query.searchingString || '';
  const minPrice = query.minPrice || 0;
  const maxPrice = query.maxPrice || 1000;

  genders.forEach((value, index) => {
    params[`filters[gender][name][${index}]`] = value;
  });

  brands.forEach((value, index) => {
    params[`filters[brand][name][${index}]`] = value;
  });

  colors.forEach((value, index) => {
    params[`filters[color][name][${index}]`] = value;
  });

  categories.forEach((value, index) => {
    params[`filters[categories][name][${index}]`] = value;
  });

  sizes.forEach((value, index) => {
    params[`filters[sizes][value][${index}]`] = value;
  });

  params['filters[name][$containsi]'] = searchString as string;
  params['filters[price][$gte]'] = minPrice as string;
  params['filters[price][$lte]'] = maxPrice as string;

  return Object.assign(params, additionalParams);
}
