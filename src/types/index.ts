import {Data} from '@/types/entities';
import {AxiosResponse} from 'axios';

export type RequestData<T> = {
  data: T;
};

export type ResponseData<T> = {
  data: T;
  meta: Meta;
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

export type GendersResponse = AxiosResponse<
  ResponseData<
    Data<{
      name: string;
    }>[]
  >
>;

export type BrandsResponse = AxiosResponse<
  ResponseData<
    Data<{
      name: string;
    }>[]
  >
>;

export type ColorsResponse = AxiosResponse<
  ResponseData<
    Data<{
      name: string;
    }>[]
  >
>;

export type SizesResponse = AxiosResponse<
  ResponseData<
    Data<{
      value: number;
    }>[]
  >
>;
