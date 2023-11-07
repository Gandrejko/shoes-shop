import {Brand, Category, Color, Gender, Product, Size, User} from './entities';

export type UserRequest = User & {
  password: string;
  identifier?: string;
};

export type ProductRequest = Partial<
  Product & {
    images: number[];
    categories: number[];
    sizes: number[];
    brand: number;
    color: number;
    gender: number;
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
