import {
  BrandsResponse,
  CategoriesResponse,
  ColorsResponse,
  GendersResponse,
  SizesResponse,
} from '@/types';

export type RequestData<T> = {
  data: T;
};

export type ResponseData<T> = {
  data: T;
  meta: Meta;
};
export type Data<T> = {
  id: number;
  attributes: DefaultAttributes & T;
};

type DefaultAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type Meta = {
  pagination?: Pagination;
};

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type FiltersData = {
  genders: GendersResponse;
  colors: ColorsResponse;
  categories: CategoriesResponse;
  brands: BrandsResponse;
  sizes: SizesResponse;
};
