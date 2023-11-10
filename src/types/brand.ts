import {Data, RequestData, ResponseData} from './data';
import {Product} from './product';

export type Brand = {
  id: number;
  name: string;
};

export type BrandAttributes = Partial<
  Brand & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type BrandRequest = Partial<
  Brand & {
    products: Product[] | number[];
  }
>;

export type BrandResponse = ResponseData<Data<BrandAttributes>>;
export type BrandsResponse = ResponseData<Data<BrandAttributes>[]>;
