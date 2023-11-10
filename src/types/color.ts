import {Data, RequestData, ResponseData} from './data';
import {Product} from './product';

export type Color = {
  id: number;
  name: string;
};

export type ColorAttributes = Partial<
  Color & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type ColorRequest = Partial<
  Color & {
    products: Product[] | number[];
  }
>;

export type ColorResponse = ResponseData<Data<ColorAttributes>>;
export type ColorsResponse = ResponseData<Data<ColorAttributes>[]>;
