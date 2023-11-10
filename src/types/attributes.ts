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

export type ProductAttributes = {
  name: string;
  description: string;
  price: number;
  teamName: 'team-1' | 'team-2' | 'team-3';
  images: RequestData<Data<Image>[] | null>;
  categories: RequestData<Data<Category>[] | null>;
  sizes: RequestData<Data<Size>[] | null>;

  brand: RequestData<Data<Brand> | null>;
  color: RequestData<Data<Color> | null>;
  gender: RequestData<Data<Gender> | null>;
  userID: RequestData<Data<User> | null>;
};

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
