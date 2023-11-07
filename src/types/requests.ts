import {Product} from './entities';

export type RequestData<T> = {
  data: T;
};

export type ProductRequest = Product &
  Partial<{
    images: number[];
    categories: number[];
    brand: number;
    color: number;
    gender: number;
    size: number;
    userID: number;
  }>;
