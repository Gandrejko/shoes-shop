import {
  Brand,
  Category,
  Color,
  Gender,
  Image,
  Product,
  Size,
  User,
} from './entities';

export type UserRequest = User & {
  password: string;
  identifier?: string;
};

export type ProductRequest = Partial<
  Product & {
    images: Image[];
    categories: Category[];
    sizes: Size[];
    brand: Brand;
    color: Color;
    gender: Gender;
    userID: number;
  }
>;

export type BrandRequest = Partial<
  Brand & {
    products: number[];
  }
>;

export type CategoryRequest = Partial<
  Category & {
    products: number[];
  }
>;

export type ColorRequest = Partial<
  Color & {
    products?: number[];
  }
>;

export type GenderRequest = Partial<
  Gender & {
    products?: number[];
  }
>;

export type SizeRequest = Partial<
  Size & {
    products?: number[];
  }
>;

export type ImageRequest = Partial<{
  files: any; // TODO: add correct type
}>;
