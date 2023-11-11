import {Data, RequestData, ResponseData} from './data';
import {Product} from './product';

export type Gender = {
  id: number;
  name: string;
};

export type GenderAttributes = Partial<
  Gender & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type GenderRequest = Partial<
  Gender & {
    products: Product[];
  }
>;

export type GenderResponse = ResponseData<Data<GenderAttributes>>;
export type GendersResponse = ResponseData<Data<GenderAttributes>[]>;
