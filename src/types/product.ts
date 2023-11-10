import {Brand} from './brand';
import {Category} from './category';
import {Color} from './color';
import {Data, RequestData, ResponseData} from './data';
import {Gender} from './gender';
import {Image} from './image';
import {Size} from './size';
import {User} from './user';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  teamName: 'team-1' | 'team-2' | 'team-3';
};

export type ProductAttributes = Partial<
  Product & {
    categories: RequestData<Data<Category>[]>;
    sizes: RequestData<Data<Size>[]>;

    images: RequestData<Data<Image>[] | null>;
    brand: RequestData<Data<Brand>> | null;
    color: RequestData<Data<Color> | null>;
    gender: RequestData<Data<Gender> | null>;
    userID: RequestData<Data<User> | null>;
  }
>;

export type ProductRequest = Partial<
  Product & {
    images: Image[];
    categories: Category[];
    sizes: Size[];

    brand: Brand;
    color: Color;
    gender: Gender;
    userID: User;
  }
>;

export type ProductResponse = ResponseData<Data<ProductAttributes>>;
export type ProductsResponse = ResponseData<Data<ProductAttributes>[]>;
