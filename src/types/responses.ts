import {ProductAttributes} from '@/types/attributes';
import {Data} from '@/types/entities';
import {ResponseData} from '@/types/index';
import {AxiosResponse} from 'axios';

export type ProductsResponse = AxiosResponse<
  ResponseData<Data<ProductAttributes>[]>
>;
