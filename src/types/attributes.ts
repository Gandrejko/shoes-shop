import {RequestData} from '.';
import {
  Product,
  Data,
  Category,
  Size,
  Brand,
  Color,
  Gender,
  Image,
  User,
} from './entities';

export type ProductAttributes = Partial<
  Product & {
    images: RequestData<Data<Image>[]>;
    categories: RequestData<Data<Category>[]>;
    sizes: RequestData<Data<Size>[]>;

    brand: RequestData<Data<Brand>> | null;
    color: RequestData<Data<Color>> | null;
    gender: RequestData<Data<Gender>> | null;
    userID: RequestData<Data<User>> | null;
  }
>;

export type UserAttributes = Partial<
  User & {
    firstName: string | null;
    lastName: string | null;
    avatar: RequestData<Data<Image>> | null;
    prodcuts: RequestData<Data<Product>[]>;
  }
>;

export type BrandAttributes = Partial<
  Brand & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type CategoryAttributes = Partial<
  Category & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type ColorAttributes = Partial<
  Color & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type GenderAttributes = Partial<
  Gender & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type SizeAttributes = Partial<
  Size & {
    products: RequestData<Data<Product>[]>;
  }
>;

export type ImageAttributes = Partial<
  Image & {
    related: RequestData<Data<Product>[]>;
  }
>;
