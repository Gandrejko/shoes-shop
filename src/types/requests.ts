import {Brand, Category, Color, Gender, Product, Size, User} from './entities';

export type RequestData<T> = {
  data: T;
};

export type UserRequest = User & {
  password: string;
  identifier?: string;
};

export type ProductRequest = Product &
  Partial<{
    images: number[];
    categories: number[];
    sizes: number[];
    brand: number;
    color: number;
    gender: number;
    userID: number;
  }>;

export type BrandRequest = Brand & {
  products?: number[];
};

export type CategoryRequest = Category & {
  products?: number[];
};

export type ColorRequest = Color & {
  products?: number[];
};

export type GenderRequest = Gender & {
  products?: number[];
};

export type SizeRequest = Size & {
  products?: number[];
};

export type ImageRequest = {
  files: any; // TODO: add correct type
};
