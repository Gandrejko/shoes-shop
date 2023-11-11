import {Data, RequestData, ResponseData} from './data';
import {Product} from './product';

export type Category = {
  id: number;
  name: string;
};

export type CategoryAttributes = Partial<
  Category & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type CategoryRequest = Partial<
  Category & {
    products: Product[];
  }
>;

export type CategoryResponse = ResponseData<Data<CategoryAttributes>>;
export type CategoriesResponse = ResponseData<Data<CategoryAttributes>[]>;
