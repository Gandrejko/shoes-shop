import {Data, Product} from './entities';

export type ResponseData<T> = {
  data: T;
  meta: Meta;
};

type Meta = Partial<{
  pagination: Pagination;
}>;

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type ProductsResponse = ResponseData<Data<Product>[]>;
export type ProductResponse = ResponseData<Data<Product>>;
