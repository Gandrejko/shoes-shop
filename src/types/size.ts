import {Data, RequestData, ResponseData} from './data';
import {Product} from './product';

export type Size = {
  id: number;
  value: number;
};

export type SizeAttributes = Partial<
  Size & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type SizeRequest = Partial<
  Size & {
    products: Product[] | number[];
  }
>;

export type SizeResponse = ResponseData<Data<SizeAttributes>>;
export type SizesResponse = ResponseData<Data<SizeAttributes>[]>;
