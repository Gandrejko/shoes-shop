import {
  Brand,
  Category,
  Color,
  Data,
  Gender,
  Image,
  Product,
  Size,
  User,
} from './entities';

export type ResponseData<T> = {
  data: T;
  meta: Meta;
};

type Meta = {
  pagination?: Pagination;
};

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type ProductResponse = Partial<
  Product & {
    images: Data<Image>[];
    categories: Data<Category>[];
    sizes: Data<Size>[];

    brand: Data<Brand> | null;
    color: Data<Color> | null;
    gender: Data<Gender> | null;
    userID: Data<User> | null;
  }
>;

export type UserResponse = Partial<
  User & {
    firstName: string | null;
    lastName: string | null;
    avatar: Data<Image> | null;
    prodcuts: Data<Product>[];
  }
>;

export type BrandResponse = Partial<
  Brand & {
    products: Data<Product>[];
  }
>;

export type CategoryResponse = Partial<
  Category & {
    products: Data<Product>[];
  }
>;

export type ColorResponse = Partial<
  Color & {
    products: Data<Product>[];
  }
>;

export type GenderResponse = Partial<
  Gender & {
    products: Data<Product>[];
  }
>;

export type SizeResponse = Partial<
  Size & {
    products: Data<Product>[];
  }
>;

export type ImageResponse = Partial<
  Image & {
    related: Data<Product>[];
  }
>;
